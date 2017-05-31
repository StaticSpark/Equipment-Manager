import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './components/home/home.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StoreComponent }   from './components/store-admin/store-admin.component';
import { StoreListComponent }   from './components/store-admin/store-list/store-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'store-admin',  component: StoreComponent },
  { path: 'store-list',  component: StoreListComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
    
}