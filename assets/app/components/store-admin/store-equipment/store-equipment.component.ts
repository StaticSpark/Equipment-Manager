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
    
    //the stores details
    store: Store;
    //button toggle
    mapLoaded: Boolean = false;
    //different types of equipment
    equipmentDropdown: Equipment[] = [];
    //the specifics stores equipment
    equipment: Equipment[] = [];
    //holds the maps element
    parentEl;
    selectedEquipment: Equipment = null; //the equipment details for drop down
    /////
    /////For drag and drop
    /////
    private event: MouseEvent;
    clickedEquipment: Equipment = null;
    selected; //holds the element selected
    isMouseDown = false;
    arrPos; //arrPos holds the position in the array.

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
    //this function will load the map that will eventually be built, 
    loadMap(ev:Event){
        if(!this.mapLoaded){
            this.parentEl = ev.srcElement.parentElement;
            for(let j = 0; j < this.equipment.length; j++){
                let equipmentEl:ElementRef = this._renderer.createElement(this.parentEl, 'div');
                this.makeNewElement(equipmentEl, this.equipment[j], j);
            }
            this.mapLoaded = true;
        }
    }
    makeNewElement(equipmentEl, equipment, j){
        //giving it a class which is its position in array
        this._renderer.setElementClass(equipmentEl,j.toString(),true);
        this._renderer.setElementClass(equipmentEl,"equipment-element",true);
        this._renderer.createText(equipmentEl,this.equipment[j].name);
        //set position to absolute then specifiy positions
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
        //make a new piece of equipment first to update the array
        let eqTest = new Equipment(this.selectedEquipment.name);
        eqTest.setAttributes(this.selectedEquipment.width, this.selectedEquipment.length, this.selectedEquipment.color)
        //push into the array and get its position
        this.equipment.push(eqTest);
        let arrLength = this.equipment.length + - 1;
        //make a new element
        let equipmentEl:ElementRef = this._renderer.createElement(this.parentEl, 'div');
        this.makeNewElement(equipmentEl, this.equipment[arrLength], arrLength);
    }
    saveEquipment(){
        this.store.equipment = this.equipment;
        this._storeService.updateEquipment(this.store)
            .subscribe(
              data=>{
                  console.log(data);
              },
                error=> console.error(error));
    }
    onMouseButton(event: MouseEvent, i): void {
        this.isMouseDown = !this.isMouseDown;
        this.selected = event.srcElement;//selected element
        this.arrPos = i;      //the elements position in the array
        this.clickedEquipment = this.equipment[i];
    }
    onMouseMove(event: MouseEvent): void {
        //if the user has clicked an element
        console.log(event.clientX);
        if (this.isMouseDown && event.clientX > 400 && event.clientX < 1400) {
            this._renderer.setElementStyle(this.selected, 'left', event.clientX - 5 + 'px');//update the elements position
            this._renderer.setElementStyle(this.selected, 'top', event.clientY + 95 + 'px');          
            this.equipment[this.arrPos].xPos = event.clientX - 5;//update the selected equipments position
            this.equipment[this.arrPos].yPos = event.clientY + 95;
        }
    }
}
