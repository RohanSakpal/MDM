import { Routes } from '@angular/router';
import { CityComponent } from './master/base-master/city/city.component';
import { StateComponent } from './master/base-master/state/state.component';
import { WarehouseComponent } from './master/transport-master/warehouse/warehouse.component';
import { TruckloadComponent } from './master/transport-master/truckload/truckload.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './Auth/auth.guard';

export const routes: Routes = [
    //{path:'dashboard',component:DashboardComponent},
    // {path:'',redirectTo:'dashboard/master/base-master/city'},
    {
        path: 'dashboard/master',
        component:DashboardComponent,
        children: [
            {
                path: 'base-master/city',
                component: CityComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'base-master/state',
                component: StateComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'transport-master/warehouse',
                component: WarehouseComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'transport-master/truckload',
                component: TruckloadComponent,
                canActivate: [AuthGuard]
            },
        ]
    },
    { 
        path: '**',
        redirectTo: 'login',
        pathMatch:'full'
    },
    { 
        path: 'login',
        component:LoginComponent
    },
    // { path: 'master/base-master/city', component: CityComponent },
    // { path: 'master/base-master/state', component: StateComponent },
    // { path: 'master/transport-master/warehouse', component: WarehouseComponent },
    // { path: 'master/transport-master/truckload', component: TruckloadComponent }

];
