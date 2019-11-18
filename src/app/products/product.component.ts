import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Product, ProductService} from '../services/product.service';
import {ProductType} from '../models/product-type';
import {SelectItem} from 'primeng/api';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Router} from "@angular/router";
import {ApiService} from "../core/api.service";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {Sets} from "../models/sets";
import {ProductDetails} from "../models/product-details";

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
  private userId: number;
  userSets: Sets[];


  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router,
              private apiService: ApiService, private userService: UserService) {
  }

  ngOnInit() {
    this.productService.loadProducts(ProductType.SALAD).subscribe(data => {
      this.products = data;
      // this.productsSet = this.products.slice();
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
        this.userSets = this.user.userSets;
      });
    }

  }

  selectProduct($event: MouseEvent, product) {
    console.log('product selected');
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

  add(event: MatChipInputEvent): void {// todo make   addProductToSet(product)  working like it

    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      // todo adding products to set of user
      // this.productsSet.push({name: value.trim()});
      console.log('Product added ' + value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(setId: number, productDetailId: number): void {
    this.productService.removeProductFromSet(setId, productDetailId);
    this.ngOnInit();
    // const index = sets.productDetails.indexOf(product);
    // if (index >= 0) {
    //   sets.productDetails.splice(index, 1);
    // }
  }

  public isCustomer(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role.toString() === 'CUSTOMER';
  }

  public isUser() {
    this.userId = JSON.parse(window.sessionStorage.getItem('user')).id;
    return this.userId != null;
  }

  addProductToSet(product) {

  }
}
