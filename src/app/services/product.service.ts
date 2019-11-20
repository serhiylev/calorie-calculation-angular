import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ProductType} from '../models/product-type';

export interface Product {
  id: number;
  name: string;
  type: string;
  image: string;
  kcal: number;
  fats: number;
  proteins: number;
  carbohydrates: number;
}

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;charset=UTF-8'
  });

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  loadProducts(type: ProductType): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/' + 'products?type=' + type.toUpperCase(), {headers});
  }

  removeProductFromSet(productSetId: number) {
    console.log('removeProductFromSet pressed');
    return this.httpClient.delete('http://localhost:8080/products/deleteProduct/' + productSetId , {headers});
  }

  addProductToSet(productId: number, setId: number, grams: number) {
    return this.httpClient.put('http://localhost:8080/products/addToSet/' + setId + '/' + productId + '/' + grams, {headers});
  }

}
