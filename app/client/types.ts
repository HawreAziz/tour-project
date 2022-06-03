export interface User {
    email: string;
    name: string;
    id: string;
}

export interface Tour {
    title: string;
    description: string;
    tags: string[],
    imageFile: string;
}


export interface UserCredentials {
    user: User;
    token: string;
}
