export interface Booking{
    id: string;
    creationDate: Date;
    amount: number;
    duration: number;
    parkingLot: Parking;
}

export interface User{
    name: string;
    surname: string;
}

export interface Parking{
    name: string;
}