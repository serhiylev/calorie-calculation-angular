import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Product, ProductService} from '../services/product.service';
import {ProductType} from '../models/product-type';
import {SelectItem} from 'primeng/api';

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

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.loadProducts(ProductType.SALAD).subscribe(data => {
      this.products = data;
      console.log(data);
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
}
