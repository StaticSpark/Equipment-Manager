import { Component, ElementRef, Renderer } from '@angular/core';

import { Equipment } from  './equipment.model';
import { EquipmentService } from './equipment.service';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.component.css'],
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent{
    

    equipment: Equipment[] = [];

    //For drag and drop
    private event: MouseEvent;
    isMouseDown = false;
    //Selected holds the element selected, arrPos holds the position in the array.
    selected;
    arrPos;

    constructor(private _renderer: Renderer, private _equipmentService: EquipmentService ) {}

    addEquipment(){
        let eqTest = new Equipment("6 Arm", "fourXfive");
        this.equipment.push(eqTest);
    }
    saveEquipment(){
        console.log(this.equipment);
        this._equipmentService.saveEquipment(this.equipment)
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
