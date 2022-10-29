import { Property } from "./property.model";

export class Client{
    constructor(public id: number, public userid: string, public properties: Property[]){}
}