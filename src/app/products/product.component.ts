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

export const stringToEnumValue = <ET, T>(enumObj: ET, str: string): T =>
  (enumObj as any)[Object.keys(enumObj).filter(k => (enumObj as any)[k] === str)[0]];

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  products: Product[];
  sortOptions: SelectItem[];

  sortKey: string;
  sortField: string;
  sortOrder: number;
  productTypes: string[];

  productsSet: ProductDetails[];
  visible = true;
  selectable = true;
  removable = true;
  private role: string;
  private user: User;
  private userId: number = null;
  userSets: Sets[];
  appMenu2: any;
  private grams: number[] = [];
  step: number;


  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router,
              private apiService: ApiService, private userService: UserService) {
  }

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

  remove(setId: number, producId: number): void {
    this.productService.removeProductFromSet(setId, producId).subscribe(() => {
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
    this.productService.addProductToSet(productId, setId, this.grams[productId]).subscribe(() =>{
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
}
