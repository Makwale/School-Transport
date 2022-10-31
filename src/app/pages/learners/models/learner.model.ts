export interface Learner{
    id: string;
    name: string;
    surname: string;
    school: School;
}

export interface School{
    grade: string;
}