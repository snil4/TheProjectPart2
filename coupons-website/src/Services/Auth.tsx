import axios from "axios";
import { error } from "console";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

class AuthService {

    public async login(role:string, email: string, password: string):Promise<string>{
        const url = `http://localhost:8080/api/${role}/login?email=${email}&password=${password}`;
        const response = await axios.get<string>(url);
        const promise = response.data;
        return promise;
    }

    public parseJwt(token: string){
        let client = jwtDecode(token) as UserModel;
        if (!this.checkClientExpiration(client)) {
            console.log("Client expiration" + client.exp + ", date now:" + Date.now());
            throw new Error("Token is expired");
        }
        client.id = parseInt(client.sub);
        return client;
    }

    public checkClientExpiration(client: UserModel): boolean{
        return client.exp >= (Date.now() / 1000);
    }

    public checkTokenExpiration(token: string) {
        const client = jwtDecode(token) as UserModel;
        return this.checkClientExpiration(client);
    }
}
const authService = new AuthService();
export default authService;