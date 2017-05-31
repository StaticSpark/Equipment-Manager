import { Component, OnInit } from '@angular/core';


import { Store } from '../store.model';
import { StoreService } from '../store-admin.service';

@Component({
    selector: 'store-list',
    styleUrls: ['./store-list.component.css'],
    templateUrl: './store-list.component.html'
})

export class StoreListComponent{
    
    stores: Store[] = [];

    constructor(private _storeService: StoreService){ }

    ngOnInit(){
        this._storeService.getStores()
                .subscribe((stores: Store[]) => {
                        this.stores = stores;   
                        console.log(this.stores);      
                    }
                );
    }
}