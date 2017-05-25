export class Equipment {

    public name: String;
    public width: Number;
    public height: Number;
    public equipmentClass: String;
    public comment: String;
    
    
    constructor(name, eqClass){
        this.name = name;
        this.equipmentClass = eqClass;
    }
}