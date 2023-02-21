import axios from "axios";
import jwtDecode from "jwt-decode";
import LoginModel from "../Models/LoginModel";
import UserModel from "../Models/UserModel";

class AuthService {

    public async login(userModel: UserModel):Promise<string>{
        const url = `http://localhost:8080/api/${userModel.role}/login`;
        const loginModel = new LoginModel(userModel.email, userModel.password);
        const response = await axios.post(url, loginModel);
        const promise = response.data;
        return promise;
    }

    public getClient(): UserModel{
        return(this.parseJwt(sessionStorage.getItem("token")));
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