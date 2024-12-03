import { Routes } from '@angular/router';


export const DashboardRoutes: Routes = [
 {
   path: 'dashboard/analytics',
   loadComponent: () =>
     import('./analytics/analytics.component').then((c) => c.AnalyticsComponent),
 },
 {
   path: 'dashboard/create-link',
   loadComponent: () =>
     import('./create-link/create-link.component').then((c) => c.CreateLinkComponent),
 },
 {
   path: 'dashboard/dashboard-container',
   loadComponent: () =>
     import('./dashboard-container/dashboard-container.component').then((c) => c.DashboardContainerComponent),
 },
 {
   path: 'dashboard/home',
   loadComponent: () =>
     import('./home/home.component').then((c) => c.HomeComponent),
 },
 {
   path: 'dashboard/link-list',
   loadComponent: () =>
     import('./link-list/link-list.component').then((c) => c.LinkListComponent),
 },
 {
  path: 'dashboard',
  redirectTo: 'dashboard/home',
  pathMatch: 'full',
 }];





