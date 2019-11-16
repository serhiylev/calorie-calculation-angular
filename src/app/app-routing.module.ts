import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ProductComponent} from './products/product.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';



const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'products', component: ProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
