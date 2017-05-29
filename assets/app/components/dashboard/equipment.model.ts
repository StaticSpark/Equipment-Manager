export class Equipment {

    public name: String;
    public xPos: Number;
    public yPos: Number;
    public equipmentClass: String;
    public comment: String;
       
    constructor(name, eqClass){
        this.name = name;
        this.equipmentClass = eqClass;
    }
}