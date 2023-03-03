import axios from "axios";
import jwtDecode from "jwt-decode";
import config from "../Utils/Config";
import LoginModel from "../Models/LoginModel";
import UserModel from "../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { AuthActionType, authStore } from "../Redux/AuthState";

class AuthService {
    // service to handle all authorization type function

    public setAuthHeader() {
        return { Authorization: `bearer ${sessionStorage.getItem("token")}`};
    }

    public async login(userModel: UserModel):Promise<UserModel>{
        console.log(userModel);
        
        const url = `${config.baseUrl}${userModel.role}/login`;
        const loginModel = new LoginModel(userModel.email, userModel.password);
        const response = await axios.post(url, loginModel);
        const promise = response.data;
        if (promise === "") {
            throw new Error("Email or password are incorrect");
        }
        const client = authService.getClient();
        sessionStorage.setItem("token", promise);
        authStore.dispatch({type: AuthActionType.Login, payload:client})
        return client;
    }

    public getClient(): UserModel{
        return(this.parseJwt(sessionStorage.getItem("token")));
    }

    public parseJwt(token: string){
        let client = jwtDecode(token) as UserModel;
        if (!this.checkClientExpiration(client)) {
            console.log("Client expiration" + client.exp + ", date now:" + Date.now());
            throw new Error("Token Expired");
        }
        client.id = parseInt(client.sub);
        return client;
    }

    public checkExpiration(): boolean{
        return this.getClient().exp >= (Date.now() / 1000);
    }

    public checkClientExpiration(client: UserModel): boolean{
        return client.exp >= (Date.now() / 1000);
    }

    public logout(){
        sessionStorage.removeItem("token");
        authStore.dispatch({type: AuthActionType.Logout, payload: null})
    }

    // public hashPassword(password: string) {
    //     return crypto.createHmac("sha256", config.secretKey).update(password).digest();
    // }
}

const authService = new AuthService();
export default authService;