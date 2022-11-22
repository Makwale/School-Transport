export interface Owner{
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    vehicles: Vehicle[];
    drivers: Driver[];
    
}

export interface Vehicle{
    id: string;
    make: string;
    model: string;
    regno: string;
    capacity: number;
    availableSeats: number;
    type: string;
    driverId: string;
    locations: Location[];
}

export interface Driver{
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
}

export interface Location{
    latitude: number;
    longitude: number;
}