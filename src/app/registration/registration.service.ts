import {Injectable} from '@angular/core';
import {Customer} from './customer';
import {Observable} from 'rxjs';
import {Headers, Http, RequestOptions, Response} from '@angular/http';


@Injectable()
export class RegistrationService {

  private readonly baseURL;

  constructor(
    private httpService: Http,
    // private httpService: HttpClient
  ) {
    this.baseURL = 'http://localhost:8080';
  }

  createCustomer(customer: Customer): Observable<Customer> {
    const body = JSON.stringify(customer);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});

    return this.httpService.post(this.baseURL + '/register/customer', body, options)
      .map((response: Response) => response.json());
  }

}
