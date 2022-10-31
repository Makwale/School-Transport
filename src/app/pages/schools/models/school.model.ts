export interface School{
    id: string;
    name: string;
    address: Address;
}

export interface Address{
    id: string;
    streetName: string;
    suburb: string;
    city: string;
    postalCode: string;
}