import {Component, OnInit} from '@angular/core';
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

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.loadProducts(ProductType.SALAD).subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }

  selectProduct($event: MouseEvent, product) {
    console.log('product selected');
  }
}
