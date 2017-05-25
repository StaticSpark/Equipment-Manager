import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { HomeComponent }   from './components/home/home.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}