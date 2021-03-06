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

export class UserShort {
    id: string;
    name: string;
}

export class UserDetailVm {
    email: string;
    firstName: string;
    lastName: string;
    role: number;
}