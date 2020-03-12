export class User {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
}

export class RegisterModel {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: number;
}

export class LoginModel {
    username: string;
    password: string;
}