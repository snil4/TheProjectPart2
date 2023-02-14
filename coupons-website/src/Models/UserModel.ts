class UserModel{
    public sub: string;
    public id: number;
    public name: string;
    public email: string;
    public role: string;
    public password: string;
    public iat: number;
    public exp: number;

    public getRole(): string {
        return this.role;
    }
}

export default UserModel;