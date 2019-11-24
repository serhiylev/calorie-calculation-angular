import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ProductType} from '../models/product-type';

export class Product {
  id: number;
  name: string;
  description: string;
  type: string;
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

  deleteProduct(id: number) {
    return this.httpClient.delete('http://localhost:8080/products/delete/' + id, {headers});
  }

  addProduct(productDescription: string, productName: string,
             productKcal: number, productCarbohydrates: number, productProteins: number,
             productFats: number, productType: string) {
    let product: Product = new Product();
    product.name = productName;
    product.description = productDescription;
    product.fats = productFats;
    product.proteins = productProteins;
    product.carbohydrates = productCarbohydrates;
    product.type = productType.toUpperCase();
    product.kcal = productKcal;
    return this.httpClient.post<Product>('http://localhost:8080/' + 'products/add',
      JSON.stringify(product), {headers});
  }

  saveProductImage(productName: string, imageFile: File) {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    return this.httpClient.post('http://localhost:8080/' + 'products/addImage/' + productName, formData);
  }
}
