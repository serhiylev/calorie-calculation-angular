import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ProductType} from '../models/product-type';

export interface Product {
  id: number;
  name: string;
  type: string;
  image: string;
}

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;charset=UTF-8'
  });

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient) {
    console.log('lol');
  }

  loadProducts(type: ProductType): Observable<Product[]> {
    // todo add enum with type of dishes and make get by type
      return this.httpClient.get<Product[]>('http://localhost:8080/' + 'products?type=' + type.toString(), {headers});
    // return new Observable<Product>();
  }
}
