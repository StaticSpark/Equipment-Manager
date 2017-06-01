import { Component, OnInit } from '@angular/core';


import { Store } from '../store.model';
import { StoreService } from '../store-admin.service';

@Component({
    selector: 'store-detail',
    styleUrls: ['./store-detail.component.css'],
    templateUrl: './store-detail.component.html'
})

export class StoreDetailComponent{
    
    store: Store;

    constructor(private _storeService: StoreService){ }

    ngOnInit(){
        let tempStore = localStorage.getItem('store');
        console.log(tempStore);
        this.store = JSON.parse(tempStore);
        console.log(this.store);
    }
}