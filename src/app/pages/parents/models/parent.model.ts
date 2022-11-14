export interface Child{
    id: string;
    name: string;
    surname: string;
    learnerSchool: LearnerSchool[];
    location: Location;
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
}

export interface Location{
    streetName: string;
    suburb: string;
    city: string;
    postalCode: number;
}