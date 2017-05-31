import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from "rxjs";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { Store } from './store.model';

@Injectable()

export class StoreService{

    store: Store;

    constructor(public _http: Http, public _location:Location){ }

    saveStore(store){
        this.store = store;
        const body = JSON.stringify(store);
        const headers = new Headers({'Content-type':'application/json'});
        return this._http.post('http://localhost:3000/store-admin/save-store', body, {headers:headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}