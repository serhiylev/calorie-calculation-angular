import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role: string;
  name: string;

  constructor() { }

  ngOnInit() {
  }

  public isUser() {
    return window.sessionStorage.getItem('user') != null;
  }

  public isCustomer(): boolean {
    this.role = JSON.parse(window.sessionStorage.getItem('user')).roles;
    return this.role.toString() === 'CUSTOMER';
  }

  public getName(): string {
    this.name = JSON.parse(window.sessionStorage.getItem('user')).userLogin;
    return this.name;
  }
}
