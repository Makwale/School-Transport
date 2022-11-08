import { Driver } from "../pages/drivers/models/driver.model";
import { Vehicle } from "../pages/owners/models/owner.model";
import { Address } from "./address.model";
import { Client } from "./client.model";

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    phone: string;
    drivers?: Driver[];
    vehicles?: Vehicle[];
}