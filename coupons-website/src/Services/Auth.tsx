import axios from "axios";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

class AuthService {

    public async login(role:string, email: string, password: string):Promise<string>{
        const url = `http://localhost:8080/api/${role}/login?email=${email}&password=${password}`;
        const response = await axios.get(url);
        const key = response.data;
        return key;
    }

    public parseJwt(token: string){
        let client = jwtDecode(token) as UserModel;
        client.id = parseInt(client.sub);
        return client;
    }
}
const authService = new AuthService();
export default authService;