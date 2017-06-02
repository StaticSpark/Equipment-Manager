import { Equipment } from './store-equipment/equipment.model';

export class Store {

    public storeName: String;
    public storeCode: Number;
    public equipment: Equipment[];
    public _id: String;

    constructor(name, code){
        this.storeName = name;
        this.storeCode = code;
        this.equipment = [];
    }
}