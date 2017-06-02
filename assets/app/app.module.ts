import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { HomeComponent }   from './components/home/home.component';

import { StoreComponent }   from './components/store-admin/store-admin.component';
import { StoreListComponent }   from './components/store-admin/store-list/store-list.component';
import { StoreDetailComponent }   from './components/store-admin/store-detail/store-detail.component';
import { StoreEquipmentComponent }   from './components/store-admin/store-equipment/store-equipment.component';
import { EquipmentComponent }   from './components/equipment/equipment.component';


//import { EquipmentService } from './components/store-admin/store-equipment/equipment.service';
import { StoreService }   from './components/store-admin/store-admin.service';
import { EquipmentService }   from './components/equipment/equipment.service';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        RouterModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        StoreComponent,
        StoreListComponent,
        StoreDetailComponent,
        StoreEquipmentComponent,
        EquipmentComponent
    ],
    providers: [
        StoreService,
        EquipmentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}