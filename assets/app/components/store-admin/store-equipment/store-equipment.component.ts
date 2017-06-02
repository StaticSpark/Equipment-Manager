import { Component, ElementRef, Renderer, OnInit } from '@angular/core';

import { Equipment } from  './equipment.model';
import { Store } from '../store.model';
import { StoreService } from '../store-admin.service';

@Component({
    selector: 'store-equipment',
    styleUrls: ['./store-equipment.component.css'],
    templateUrl: './store-equipment.component.html'
})

export class StoreEquipmentComponent implements OnInit{
    

    equipment: Equipment[] = [];
    store: Store;

    //For drag and drop
    private event: MouseEvent;
    isMouseDown = false;
    //Selected holds the element selected, arrPos holds the position in the array.
    selected;
    arrPos;

    constructor(private _renderer: Renderer, private _storeService: StoreService ) {}

    ngOnInit(){
        this.store = JSON.parse(localStorage.getItem('store'));
        console.log(this.store);
        this.equipment = this.store.equipment;
    }
    addEquipment(){
        let eqTest = new Equipment("6 Arm", "fourXfive");
        this.equipment.push(eqTest);
    }
    saveEquipment(){
        console.log(this.equipment);
        this.store.equipment = this.equipment;
        console.log(this.store);
        this._storeService.updateEquipment(this.store)
            .subscribe(
              data=>{
                  console.log(data);
              },
                error=> console.error(error));
    }
    onMouseButton(event: MouseEvent, i): void {
        this.isMouseDown = !this.isMouseDown;
        this.selected = event.srcElement;
        this.arrPos = i;      
    }
    onMouseMove(event: MouseEvent): void {
        console.log(this.arrPos);

        if (this.isMouseDown) {
            this._renderer.setElementStyle(this.selected, 'left', event.clientX - 20 +'px');
            this._renderer.setElementStyle(this.selected, 'top', event.clientY + 'px');

            this.equipment[this.arrPos].xPos = event.clientX - 20;
            this.equipment[this.arrPos].yPos = event.clientY;
        }
    }
}
