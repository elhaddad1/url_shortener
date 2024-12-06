import { Routes } from '@angular/router';
import { DashboardRoutes } from './app/dashboard/app.dashboard-routing';
import { GuestRoutes } from './app/features/app.dashboard-routing';
import { AuthRoutes } from './app/auth/auth-routing.module';



const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
   }];
   
   
   export const combinedRoutes: Routes = [ ...routes ,...GuestRoutes,...DashboardRoutes,...AuthRoutes];