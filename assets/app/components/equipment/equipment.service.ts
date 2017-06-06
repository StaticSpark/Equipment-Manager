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
    getEquipment(){
        const headers = new Headers({'Content-type':'application/json'});
        return this._http.get('http://localhost:3000/equipment/get-equipment', {headers:headers})
            .map((response: Response) => {
                const equipment = response.json().obj;     
                let transformEquipment: Equipment[] = [];  
                for(let equip of equipment){             
                        let equipmentTemp = new Equipment(equip.name);
                        equipmentTemp.xPos = equip.xPos;
                        equipmentTemp.yPos = equip.yPos;
                        equipmentTemp.color = equip.color;
                        equipmentTemp.width = equip.width;
                        equipmentTemp.length = equip.length;
                        transformEquipment.push(equipmentTemp);
                }
                this.equipment = transformEquipment;      
                return transformEquipment;
            })  
            .catch((error: Response) => Observable.throw(error.json()));
    }
}