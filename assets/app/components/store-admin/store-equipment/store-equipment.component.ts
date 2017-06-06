import { Component, ElementRef, Renderer, OnInit, ViewChild  } from '@angular/core';

import { Equipment } from  '../../equipment/equipment.model';
import { EquipmentService } from  '../../equipment/equipment.service';

import { Store } from '../store.model';
import { StoreService } from '../store-admin.service';

@Component({
    selector: 'store-equipment',
    styleUrls: ['./store-equipment.component.css'],
    templateUrl: './store-equipment.component.html'
})

export class StoreEquipmentComponent implements OnInit{
    
    mapLoaded: Boolean = false;
    equipmentDropdown: Equipment[] = [];
    equipment: Equipment[] = [];
    selectedEquipment: Equipment;
    parentEl;
    store: Store;
    //For drag and drop
    private event: MouseEvent;
    isMouseDown = false;
    //Selected holds the element selected, arrPos holds the position in the array.
    selected;
    arrPos;

    constructor(private _renderer: Renderer, private _storeService: StoreService, private _equipmentService: EquipmentService ) {}

    ngOnInit(){
        this.store = JSON.parse(localStorage.getItem('store'));
        console.log(this.store);
        this._equipmentService.getEquipment()                
            .subscribe((equipmentArr: Equipment[]) => {
                        this.equipmentDropdown = equipmentArr;   
                        console.log(this.equipmentDropdown);      
                    }
                );
        this.equipment = this.store.equipment;
    }
    //this function will load the map that will eventually be built, I will move the code for rendering the equipment to a seperate function later
    loadMap(ev:Event){
        if(!this.mapLoaded){
            for(let j = 0; j < this.equipment.length; j++){
                this.parentEl = ev.srcElement.parentElement;
                let equipmentEl:ElementRef = this._renderer.createElement(this.parentEl, 'div');
                //*!*! REVISIT THIS LATER -  i think it might be a better idea to not use a class but set all the styles from the object instead. New equipment can be dynamically added this way

                this._renderer.setElementClass(equipmentEl,j.toString(),true);
                this._renderer.createText(equipmentEl,this.equipment[j].name);
                //set positions that were stored the last time 
                this._renderer.setElementStyle(equipmentEl, 'position','absolute');
                this._renderer.setElementStyle(equipmentEl, 'left', this.equipment[j].xPos +'px');
                this._renderer.setElementStyle(equipmentEl, 'top', this.equipment[j].yPos + 'px');
                //set width and height
                this._renderer.setElementStyle(equipmentEl, 'width', this.equipment[j].width +'px');
                this._renderer.setElementStyle(equipmentEl, 'height', this.equipment[j].length + 'px');
                //set background color
                this._renderer.setElementStyle(equipmentEl, 'background-color', '#' + this.equipment[j].color);

                //add in the click/drag functionality
                this._renderer.listen(equipmentEl, 'click', (event) => this.onMouseButton(event,j));
            }
            this.mapLoaded = true;
        }
    }
    dropDownChanged(val: any){
        console.log(val);
        for(let i = 0; i < this.equipmentDropdown.length; i++){
            if(val === this.equipmentDropdown[i].name){
                console.log(this.equipmentDropdown[i]);
                return this.selectedEquipment = this.equipmentDropdown[i];
            }
        }
    }
    addEquipment(){
        let eqTest = new Equipment(this.selectedEquipment.name);
        eqTest.width = this.selectedEquipment.width;
        eqTest.length = this.selectedEquipment.length;
        eqTest.color = this.selectedEquipment.color;
        this.equipment.push(eqTest);
        console.log(this.equipment);
        let arrLength = this.equipment.length + - 1;
        let equipmentEl:ElementRef = this._renderer.createElement(this.parentEl, 'div');
        this._renderer.setElementClass(equipmentEl, arrLength.toString() ,true);
        this._renderer.setElementStyle(equipmentEl, 'position','absolute');
        this._renderer.setElementStyle(equipmentEl, 'left', 400 +'px');
        this._renderer.setElementStyle(equipmentEl, 'top', 400 + 'px');
        //set width and height
        this._renderer.setElementStyle(equipmentEl, 'width', this.selectedEquipment.width +'px');
        this._renderer.setElementStyle(equipmentEl, 'height', this.selectedEquipment.length + 'px');
        //set background color
        this._renderer.setElementStyle(equipmentEl, 'background-color', '#' + this.selectedEquipment.color);
        this._renderer.listen(equipmentEl, 'click', (event) => this.onMouseButton(event,arrLength));
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
