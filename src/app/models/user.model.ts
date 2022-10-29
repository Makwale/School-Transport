import { Address } from "./address.model";
import { Client } from "./client.model";

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
}