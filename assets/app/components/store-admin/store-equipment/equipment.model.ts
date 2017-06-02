export class Equipment {

    public name: string;
    public xPos: Number;
    public yPos: Number;
    public equipmentClass: string;
    public comment: string;
    public _id: string;
    
    constructor(name, eqClass){
        this.name = name;
        this.equipmentClass = eqClass;
    }
}