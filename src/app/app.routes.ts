import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { HomeComponent } from './components/home/home';
import { authGuard } from './guards/auth-guard';
import {  ProductComponent } from './components/product/product';
import { CartComponent } from './components/cart/cart';
import { CheckoutComponent } from './components/checkout/checkout';
import { OrderComponent } from './components/order/order';
import { FaqComponent } from './components/faq/faq';
import { TestimonialComponent } from './components/testmonial/testmonial';
import { ProductDetailComponent } from './components/product/product-detail/product-detail';
import { ContactComponent } from './components/contact/contact';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductComponent, canActivate: [authGuard] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'testimonials', component: TestimonialComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/auth/login' }
];
