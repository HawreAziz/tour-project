export interface User {
    email: string;
    name: string;
    id: string;

}
export interface UserData {
    user: User;
    token: string;
}

export interface TourData {
    title: string;
    description: string;
    tags: string[],
    imageFile: string;
}

export interface Tour extends TourData {
    name: string;
    creator: string;
    id: string;
}

export interface UserCredentials {
    user: User;
    token: string;
}