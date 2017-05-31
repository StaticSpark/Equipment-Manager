import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { HomeComponent }   from './components/home/home.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StoreComponent }   from './components/store-admin/store-admin.component';

import { EquipmentService } from './components/dashboard/equipment.service';
import { StoreService }   from './components/store-admin/store-admin.service';

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
        DashboardComponent,
        StoreComponent
    ],
    providers: [EquipmentService,StoreService],
    bootstrap: [AppComponent]
})
export class AppModule {

}