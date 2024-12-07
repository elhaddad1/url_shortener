import { Routes } from '@angular/router';


export const GuestRoutes: Routes = [
 {
   path: 'subscription',
   loadComponent: () =>
     import('./subscription/subscription.component').then((c) => c.SubscriptionComponent),
 },
 {
   path: 'urlshortener',
   loadComponent: () =>
     import('./url-shortener/url-shortener.component').then((c) => c.UrlShortenerComponent),
 },
 {
   path: 'home',
   loadComponent: () =>
     import('./home/home.component').then((c) => c.HomeComponent),
 },
 {
   path: 'about',
   loadComponent: () =>
     import('./about/about.component').then((c) => c.AboutComponent),
 },
 {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
 }];





