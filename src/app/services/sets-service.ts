import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../models/user';

const headers = new HttpHeaders(
  {
    'Content-Type': 'application/json;charset=UTF-8'
  });

@Injectable()
export class SetsService {

  constructor(private httpClient: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/' + 'customer?id=' + id, {headers});
  }

  addSet(name: string, description: string, userId: number) {
    return this.httpClient.put('http://localhost:8080/sets/addSet/' + name + '/' + description + '/' + userId, {headers});
  }

  removeSet(setId: number, userId: number) {
    return this.httpClient.delete('http://localhost:8080/sets/deleteSet/' + userId + '/' + setId, {headers});
  }
}
