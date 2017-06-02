import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './components/home/home.component';
import { StoreComponent }   from './components/store-admin/store-admin.component';
import { StoreListComponent }   from './components/store-admin/store-list/store-list.component';
import { StoreDetailComponent }   from './components/store-admin/store-detail/store-detail.component';
import { EquipmentComponent }   from './components/equipment/equipment.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'store-admin',  component: StoreComponent },
  { path: 'store-list',  component: StoreListComponent },
  { path: 'store-detail', component: StoreDetailComponent},
  { path: 'equipment', component: EquipmentComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
    
}