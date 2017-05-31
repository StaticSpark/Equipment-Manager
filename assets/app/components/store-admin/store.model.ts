import { Equipment } from '../dashboard/equipment.model';

export class Store {

    public storeName: String;
    public storeCode: Number;
    public equipment: Equipment[];
       
    constructor(name, code){
        this.storeName = name;
        this.storeCode = code;
        this.equipment = [];
    }
}