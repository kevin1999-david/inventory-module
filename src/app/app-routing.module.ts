import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';

import { AuthGuard } from "./shared/guards/auth.guard";
import { AuthLoginGuard } from "./shared/guards/auth-login.guard";
import { AuthAdminGuard } from "./shared/guards/auth-admin.guard";
import { BodeguerosComponent } from './components/bodeguero/bodegueros/bodegueros.component';
import { CreateBodegueroComponent } from './components/bodeguero/create-bodeguero/create-bodeguero.component';
import { ProductsComponent } from './components/product/products/products.component';
import { SettingsComponent } from './components/setting/settings/settings.component';
import { CreateSettingComponent } from './components/setting/create-setting/create-setting.component';
import { SearchSettingComponent } from './components/setting/search-setting/search-setting.component';
import { MovementsComponent } from './components/product/movements/movements.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: 'bodegueros', component: BodeguerosComponent, canActivate: [AuthLoginGuard, AuthAdminGuard] },
  { path: 'productos', component: ProductsComponent, canActivate: [AuthLoginGuard] },
  { path: 'producto-new', component: CreateProductComponent, canActivate: [AuthLoginGuard] },
  { path: 'producto-edit/:id', component: CreateProductComponent, canActivate: [AuthLoginGuard] },
  { path: 'bodeguero-new', component: CreateBodegueroComponent, canActivate: [AuthLoginGuard, AuthAdminGuard] },
  { path: 'bodeguero-edit/:id', component: CreateBodegueroComponent, canActivate: [AuthLoginGuard, AuthAdminGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthLoginGuard] },
  { path: "ajuste-new", component: CreateSettingComponent, canActivate: [AuthLoginGuard] },
  { path: "ajustes", component: SettingsComponent, canActivate: [AuthLoginGuard] },
  { path: "movimientos/:id", component: MovementsComponent, canActivate: [AuthLoginGuard] },
  { path: "buscar-ajustes", component: SearchSettingComponent, canActivate: [AuthLoginGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthLoginGuard] },
  { path: '**', component:  ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
