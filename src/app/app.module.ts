import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";


import { LoginComponent } from './components/login/login.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BodeguerosComponent } from './components/bodeguero/bodegueros/bodegueros.component';
import { CreateBodegueroComponent } from './components/bodeguero/create-bodeguero/create-bodeguero.component';
import { AdminInterceptor } from './shared/interceptors/admin-interceptor';
import { ProductsComponent } from './components/product/products/products.component';


import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CreateSettingComponent } from './components/setting/create-setting/create-setting.component';
import { SettingsComponent } from './components/setting/settings/settings.component';
import { SearchSettingComponent } from './components/setting/search-setting/search-setting.component';
import { MovementsComponent } from './components/product/movements/movements.component';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateProductComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BodeguerosComponent,
    CreateBodegueroComponent,
    ProductsComponent,
    CreateSettingComponent,
    SettingsComponent,
    SearchSettingComponent,
    MovementsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
