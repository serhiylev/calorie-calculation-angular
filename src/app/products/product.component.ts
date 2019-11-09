import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Product, ProductService} from '../services/product.service';
import {ProductType} from '../models/product-type';
import {SelectItem} from 'primeng/api';

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

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.loadProducts(ProductType.SALAD).subscribe(data => {
      this.products = data;
      console.log(data);
    });
    this.sortOptions = [
      {label: 'Newest First', value: '!year'},
      {label: 'Oldest First', value: 'year'},
      {label: 'Brand', value: 'brand'}
    ];
  }

  selectProduct($event: MouseEvent, product) {
    console.log('product selected');
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
