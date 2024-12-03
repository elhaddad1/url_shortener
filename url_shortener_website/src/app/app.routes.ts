import { Routes } from '@angular/router';
import { DashboardRoutes } from './app/dashboard/app.dashboard-routing';



const routes: Routes = [{
    path: '',
    redirectTo: 'dashboard/home',
    pathMatch: 'full',
   }];
   
   
   export const combinedRoutes: Routes = [ ...routes ,...DashboardRoutes];