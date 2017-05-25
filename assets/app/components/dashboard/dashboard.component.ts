import { Component } from '@angular/core';

import { Equipment } from  './equipment.model';

@Component({
    selector: 'dashboard',
    styleUrls: ['./dashboard.component.css'],
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent{

    equipment: Equipment[] = [];

    addEquipment(){
        let eqTest = new Equipment("6 Arm", "fourXfive");
        this.equipment.push(eqTest);
    }
}