import { Routes } from '@angular/router';


export const AuthRoutes: Routes = [
 {
   path: 'auth/login',
   loadComponent: () =>
     import('./components/login/login.component').then((c) => c.LoginComponent),
 },
 {
   path: 'auth/register',
   loadComponent: () =>
     import('./components/registration/registration.component').then((c) => c.RegistrationComponent),
 }];





