export type Roles = 'BODE' | 'ADMIN';

export interface User {
    id: string;
    password: string;
}

export interface UserResponse {
    message: string;
    token: string;
    id: string;
    name: string,
    lastname: string,
    role: Roles
}

export interface Bode {
    id: string,
    name: string,
    lastname: string,
    password?: string,
    birthdate: string;
    address: string,
    phone: string,
    email: string,
    state: boolean,
    role?: number
}