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
import {ProductSetCreatingDialogComponent} from './ProductSetCreatingDialog';

export const stringToEnumValue = <ET, T>(enumObj: ET, str: string): T =>
  (enumObj as any)[Object.keys(enumObj).filter(k => (enumObj as any)[k] === str)[0]];

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router,
              private apiService: ApiService, private userService: UserService, private dialog: MatDialog) {
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

  description: string;
  name: string;

  ngOnInit() {
    this.productService.loadProducts(ProductType.SALAD).subscribe(data => {
      this.products = data;
    });
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
      this.products = data;
      console.log(data);
      console.log(stringToEnumValue(ProductType, productType));
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
    const role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    if (role == null) {
      return;
    }
    this.role = role;
    return this.role.toString() === 'CUSTOMER';
  }

  public isUser() {
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    if (user == null) { return; }
    this.userId = user.id;
    return this.userId;
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
    const dialogRef = this.dialog.open(ProductSetCreatingDialogComponent, {
      width: '40%',
      data: {name: this.name, description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.description = result.description;
      this.name = result.name;
      console.log(this.name);
    });
  }
}
