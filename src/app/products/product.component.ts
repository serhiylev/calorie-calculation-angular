import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Product, ProductService} from '../services/product.service';
import {ProductType} from '../models/product-type';
import {SelectItem} from 'primeng/api';
import {Router} from '@angular/router';
import {ApiService} from '../core/api.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Sets} from '../models/sets';
import {ProductDetails} from '../models/product-details';
import {MatDialog} from '@angular/material/dialog';
import {ProductSetCreatingDialogComponent} from './product-set-creating-dialog';
import {SetsService} from '../services/sets-service';
import {ProductCreatingDialogComponent} from './product-creating-dialog';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export const stringToEnumValue = <ET, T>(enumObj: ET, str: string): T =>
  (enumObj as any)[Object.keys(enumObj).filter(k => (enumObj as any)[k] === str)[0]];

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  private productType: string;
  private productDescription: string;
  private productName: string;
  private productKcal: number;
  private productCarbohydrates: number;
  private productProteins: number;
  private productFats: number;
  private productImage: File;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router,
              private apiService: ApiService, private userService: UserService, private dialog: MatDialog,
              private setService: SetsService) {
  }

  products: Product[];
  sortOptions: SelectItem[];

  sortKey: string;
  sortField: string;
  sortOrder: number;
  productTypes: string[];

  visible = true;
  selectable = true;
  removable = true;
  private role: string;
  private user: User;
  private userId: number = null;
  userSets: Sets[];
  private grams: number[] = [];
  step: number;

  setDescription: string;
  setName: string;

  ngOnInit() {
    this.getProductsByType(ProductType.SALAD);
    this.productTypes = [
      ProductType.SALAD.toString(), ProductType.DESSERT.toString(),
      ProductType.FIRST_DISH.toString(), ProductType.SECOND_DISH.toString()
    ];
    this.sortOptions = [
      {label: 'Name', value: 'name'},
      {label: 'Type', value: 'type'},
      {label: 'Brand', value: 'brand'},
      {label: 'None', value: false}
    ];
    if (this.isUser()) {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        this.userSets = user.userSets;
      });
    }
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  getProductsByType(productType: string) {
    this.productService.loadProducts(stringToEnumValue(ProductType, productType)).subscribe(data => {
      this.productType = productType;
      this.products = data;
    });
  }

  remove(productSetId: number): void {
    this.productService.removeProductFromSet(productSetId).subscribe(() => {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        this.userSets = this.user.userSets;
      });
    });
  }

  public isCustomer(): boolean {
    if (this.isUser() != null) {
      const role = JSON.parse(window.sessionStorage.getItem('user')).roles;
      if (role == null) {
        return;
      }
      this.role = role;
      return this.role.toString() === 'CUSTOMER';
    }
  }

  public isUser() {
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    if (user == null) {
      return;
    }
    this.userId = user.id;
    return this.userId;
  }

  public isAdmin() {
    if (this.isUser() != null) {
      const role = JSON.parse(window.sessionStorage.getItem('user')).roles;
      if (role == null) {
        return;
      }
      this.role = role;
      return this.role.toString() === 'ADMIN';
    }
  }

  addProductToSet(productId: number, setId: number) {
    if (this.grams[productId] == null) {
      this.grams[productId] = 100;
    }
    this.productService.addProductToSet(productId, setId, this.grams[productId]).subscribe(() => {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userSets = user.userSets;
      });
    });
  }

  getGrams($event: KeyboardEvent, productId: number) {
    this.grams[productId] = Number((event.target as HTMLInputElement).value);
  }

  setStep(index: number) {
    this.step = index;
  }

  totalGrams(productsDetails: ProductDetails[]) {
    let total = 0;
    productsDetails.forEach(product => {
      total += product.grams;
    });
    return total;
  }

  totalProteins(productsDetails: ProductDetails[]) {
    let total = 0;
    productsDetails.forEach(productDet => {
      total += ((productDet.grams * productDet.product.proteins) / 100);
    });
    return total;
  }

  totalCarbohydrates(productsDetails: ProductDetails[]) {
    let total = 0;
    productsDetails.forEach(productDet => {
      total += ((productDet.grams * productDet.product.carbohydrates) / 100);
    });
    return total;
  }

  totalFats(productsDetails: ProductDetails[]) {
    let total = 0;
    productsDetails.forEach(productDet => {
      total += ((productDet.grams * productDet.product.fats) / 100);
    });
    return total;
  }

  totalKcal(productsDetails: ProductDetails[]) {
    let total = 0;
    productsDetails.forEach(productDet => {
      total += ((productDet.grams * productDet.product.kcal) / 100);
    });
    return total;
  }

  openCreateSetDialog(): void {
    this.setName = null;
    this.setDescription = null;
    const dialogRef = this.dialog.open(ProductSetCreatingDialogComponent, {
      width: '40%',
      data: {name: this.setName, description: this.setDescription}
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        this.setDescription = result.description;
        this.setName = result.name;
        if (this.setName != null) {
          this.setService.addSet(this.setName, this.setDescription, this.user.id).subscribe(() => {
            this.userService.getUserById(this.userId).subscribe(user => {
              this.user = user;
              this.userSets = this.user.userSets;
            });
          });
        }
      } catch (e) {
      }
    });
  }

  openCreateProductDialog(productType: string) {
    this.productDescription = null;
    this.productName = null;
    this.productImage = null;
    this.productKcal = null;
    this.productCarbohydrates = null;
    this.productProteins = null;
    this.productFats = null;
    const dialogRef = this.dialog.open(ProductCreatingDialogComponent, {
      data: {
        productName: this.productName, productDescription: this.productDescription, productImage: this.productImage,
        productKcal: this.productKcal, productCarbohydrates: this.productCarbohydrates,
        productProteins: this.productProteins, productFats: this.productFats, type: productType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        console.log(result);
        console.log('IT wor');
        this.productDescription = result.productDescription;
        this.productName = result.productName;
        this.productImage = result.productImage;
        this.productKcal = result.productKcal;
        this.productCarbohydrates = result.productCarbohydrates;
        this.productProteins = result.productProteins;
        this.productFats = result.productFats;
        if (this.productName != null) {
          this.productService.addProduct(this.productDescription, this.productName, this.productKcal,
            this.productCarbohydrates, this.productProteins, this.productFats, productType).subscribe(() => {
            this.productService.saveProductImage(this.productName, this.productImage).subscribe(() => {
              this.userService.getUserById(this.userId).subscribe(user => {
                this.getProductsByType(this.productType);
              });
            });
            this.userService.getUserById(this.userId).subscribe(user => {
              this.getProductsByType(this.productType);
            });
          });
        }
      } catch (e) {
      }
    });
  }

  removeSet(setId: number) {
    this.setService.removeSet(setId, this.user.id).subscribe(() => {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        this.userSets = this.user.userSets;
      });
    });
  }

  deleteProductById(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProductsByType(this.productType);
    });
  }

  download(name: string, description: string, productsDetails: ProductDetails[]) {
    const doc = new jsPDF();
    doc.setFontType('bold');
    doc.setFontSize(20);
    doc.text(name, 90, 15);
    doc.setFontSize(15);
    doc.setFontType('normal');
    doc.text(description, 10, 30);
    // doc.table(10, 40, [{'lol1', 10}, {  lol2, 20}]);
    let j = 50;
    for (const productsDetail of productsDetails) {
      doc.text(10, j, 'product name = ' + productsDetail.product.name + '   calories = ' +
        productsDetail.product.kcal + '   grams = ' + productsDetail.grams);
      j += 10;
    }
    doc.save(name + '.pdf');
  }

  getImage(image: File) {

  }
}
