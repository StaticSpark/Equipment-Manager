import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from './store.model';
import { StoreService } from './store-admin.service';

@Component({
    selector: 'store',
    styleUrls: ['./store-admin.component.css'],
    templateUrl: './store-admin.component.html'
})

export class StoreComponent{
    
    storeForm: FormGroup;

    constructor(private _fb: FormBuilder, private _storeService: StoreService){ }

    ngOnInit(){
        this.initForm();
    }

    initForm(){   
        this.storeForm = this._fb.group({
            storeName: [''],
            storeCode: ['']
        });   
    }
    createStore(){
        let store = new Store(this.storeForm.value.storeName,this.storeForm.value.storeCode);
        console.log(store);
        this._storeService.saveStore(store)
            .subscribe(
                data=>console.log(data),
                error=>console.log(error)
            );
    }
}