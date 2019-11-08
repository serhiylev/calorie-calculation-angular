import { Component, OnInit } from '@angular/core';
import {DishType} from '../models/dish-type';
import {FormBuilder} from '@angular/forms';
import {Product, ProductService} from '../services/product.service';
import {ProductType} from '../models/product-type';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[];

  constructor(private formBuilder: FormBuilder, private dishService: ProductService) {}

  ngOnInit() {
    // this.dishService.loadDishes(DishType.SALAD);
    console.log(this.dishService.loadProducts(ProductType.SALAD));
  }

  selectProduct($event: MouseEvent, product) {
    console.log('product selected');
  }
}
