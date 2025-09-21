import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';
import { loggedinGuard } from './core/guards/loggedin/loggedin-guard';


export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', loadComponent: () => import('./features/home/home').then((c) => c.Home), title:'Home'},
    {path:'products', loadComponent: () => import('./features/products/products').then((c) => c.Products), title:'Products'},
    {path:'brands', loadComponent: () => import('./features/brands/brands').then((c) => c.Brands), title:'Brands'},
    {path:'categories', loadComponent: () => import('./features/categories/categories').then((c) => c.Categories), title:'Categories'},
    {path:'cart', loadComponent: () => import('./features/cart/cart').then((c) => c.Cart), title:'Cart', canActivate:[authGuard]},
    {path:'wishlist',loadComponent: () => import('./features/wishlist/wishlist').then((c) => c.Wishlist), title:'Wishlist', canActivate:[authGuard]},
    {path:'checkout/:id', loadComponent: () => import('./features/checkout/checkout').then((c) => c.Checkout), title:'Checkout', canActivate:[authGuard], data: { renderMode: 'server' }},
    {path:'allorders', loadComponent: () => import('./features/all-orders/all-orders').then((c) => c.AllOrders), title:'All Orders', canActivate:[authGuard]},
    {path:'login', loadComponent: () => import('./features/login/login').then((c) => c.Login), title:'Login', canActivate:[loggedinGuard]},
    {path:'signup', loadComponent: () => import('./features/signup/signup').then((c) => c.Signup), title:'Signup', canActivate:[loggedinGuard]},
    {path:'forgetpassword', loadComponent: () => import('./features/forgetpassword/forgetpassword').then((c) => c.Forgetpassword), title:'Forget Password', canActivate:[loggedinGuard]},
    {path:'productDetails/:id', loadComponent: () => import('./features/product-details/product-details').then((c) => c.ProductDetails), title:'Product Details', data: { renderMode: 'server' }},
    {path:'brandProducts/:name', loadComponent: () => import('./features/brand-products/brand-products').then((c) => c.BrandProducts), title:'Brand Products',data: { renderMode: 'server' }},
    {path:'categoryProducts/:name', loadComponent: () => import('./features/category-products/category-products').then((c) => c.CategoryProducts), title:'Category Products',data: { renderMode: 'server' }},
    {path:'subcategoryProducts/:name', loadComponent: () => import('./features/subcategory-products/subcategory-products').then((c) => c.SubcategoryProducts), title:'Subcategory Products',data: { renderMode: 'server' }},
    {path:'**', loadComponent: () => import('./features/not-found/not-found').then((c) => c.NotFound), title:'Not Found'}
];
