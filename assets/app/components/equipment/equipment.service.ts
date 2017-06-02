import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from "rxjs";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { Equipment } from './equipment.model';

@Injectable()

export class EquipmentService{

    equipment: Equipment[] = [];

    constructor(public _http: Http, public _location:Location){ }

    saveEquipment(equipment){
        this.equipment = equipment;//update the service array
        const body = JSON.stringify(equipment);
        const headers = new Headers({'Content-type':'application/json'});
        return this._http.post('http://localhost:3000/equipment/save-equipment', body, {headers:headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

}