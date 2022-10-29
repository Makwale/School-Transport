import { Address } from "./address.model";
import { Image } from "./image.model";

export class Property{
    constructor(public id: number, public type: string, 
        public desc: string, public price: number,
         public address: Address, public images: Image[]){}
}