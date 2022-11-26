export interface Child{
    id: string;
    name: string;
    surname: string;
    learnerSchool: LearnerSchool[];
    location: Location;
    learnerTransports: LearnerTransport[];
}

export interface LearnerSchool{
    id: string;
    grade: string;
    level: string;
    school: School;
}

export interface School{
    id: string;
    name: string;
    schoolTransports: SchoolTransport[];
}

export interface Location{
    streetName: string;
    suburb: string;
    city: string;
    postalCode: number;
    latitude: number;
    longitude: number;
}

export interface SchoolTransport{
    vehicle: Vehicle;
}

export interface Vehicle{
    id: string;
    make: string;
    model: string;
    locations: Location;
    regno: string;
}

export interface Location{
    latitude: number;
    longitude: number;
    distance: number;
    city: string;
    suburb: string;
}

export interface LearnerTransport{
    vehicle: Vehicle;
}