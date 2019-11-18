import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import {ProductService} from './services/product.service';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './products/product.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import {ButtonsModule, IconsModule, NavbarModule, WavesModule} from 'angular-bootstrap-md';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ApiService} from './core/api.service';
import {DataGridModule} from 'primeng/datagrid';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from "@angular/material/expansion";
import {UserService} from "./services/user.service";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    ProductComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    NavbarModule,
    WavesModule,
    DropdownModule,
    IconsModule,
    ButtonsModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    DataViewModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MDBBootstrapModule,
    DataGridModule,
    MatMenuModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [ProductService, ApiService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
