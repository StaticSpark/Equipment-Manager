export class Equipment {

    public name: string;
    public xPos: Number;
    public yPos: Number;
    public equipmentClass: string;
    public comment: string;
    public _id: string;
    public width: Number;
    public length: Number;
    public color: string;

    constructor(name){
        this.name = name;
    }
}