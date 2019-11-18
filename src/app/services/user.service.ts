import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ProductType} from '../models/product-type';
import {User} from "../models/user";

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;charset=UTF-8'
  });

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/' + 'customer?id=' + id, {headers});
  }
}
