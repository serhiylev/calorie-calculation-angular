import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ProductComponent} from './products/product.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'products', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
