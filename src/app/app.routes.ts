import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { ErrorPageComponent } from './error-page/error-page.component';


export const routes: Routes = [{path:'', component:HomeComponent}, 
     { path: 'travel/:place', component: SingleTripComponent },
     { path: 'error', component: ErrorPageComponent, data: { message: 'Page not found!' } },
     { path: '**', redirectTo: 'error' }];
