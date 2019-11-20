import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {HeaderComponent} from './header/header.component';
import {ProductComponent} from './products/product.component';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {ButtonsModule, IconsModule, MDBBootstrapModule, NavbarModule, WavesModule} from 'angular-bootstrap-md';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ApiService} from './core/api.service';
import {DataGridModule} from 'primeng/datagrid';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {UserService} from './services/user.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RegistrationComponent} from './registration/registration.component';
import {CaptchaComponent} from './captcha/captcha.component';
import {RegistrationService} from './registration/registration.service';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {NgxCaptchaModule} from 'ngx-captcha';
import {HttpModule} from '@angular/http';
import {MatTableModule} from '@angular/material/table';
import {ProductSetCreatingDialogComponent} from "./products/ProductSetCreatingDialog";
import {MatDialogModule} from "@angular/material/dialog";

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    ProductComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    CaptchaComponent,
    ProductSetCreatingDialogComponent
  ],
  entryComponents: [ProductSetCreatingDialogComponent],
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
    HttpModule,
    MDBBootstrapModule,
    DataGridModule,
    MatMenuModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatExpansionModule,
    MatTooltipModule,
    NgxCaptchaModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatTableModule,
    MatDialogModule,
  ],
  providers: [ProductService, ApiService, UserService, RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
