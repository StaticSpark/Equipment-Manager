import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Equipment } from './equipment.model';
import { EquipmentService } from './equipment.service';

@Component({
    selector: 'equipment',
    styleUrls: ['./equipment.component.css'],
    templateUrl: './equipment.component.html'
})

export class EquipmentComponent{
    
    equipmentForm: FormGroup;

    constructor(private _fb: FormBuilder, private _equipmentService: EquipmentService){ }

    ngOnInit(){
        this.initForm();
    }

    initForm(){   
        this.equipmentForm = this._fb.group({
            name: [''],
            width: [''],
            length: [''],
            color: ['']
        });   
    }
    createEquipment(){
        let equipment = new Equipment(this.equipmentForm.value.name);
        equipment.width = this.equipmentForm.value.width;
        equipment.length = this.equipmentForm.value.length;
        equipment.color = this.equipmentForm.value.color;

        this._equipmentService.saveEquipment(equipment)
            .subscribe(
                data=>console.log(data),
                error=>console.log(error)
            );
    }
}