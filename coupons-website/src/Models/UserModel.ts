class UserModel{
    public sub: string;
    public id: number;
    public name: string;
    public email: string;
    public role: string | Role;
    public iat: number;
    public exp: number;
    public password: string;
}

export enum Role {
    ADMIN, COMPANY, CUSTOMER
}

export default UserModel;