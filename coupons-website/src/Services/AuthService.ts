import axios from "axios";
import jwtDecode from "jwt-decode";
import config from "../Utils/Config";
import LoginModel from "../Models/LoginModel";
import UserModel, { Role } from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import { companiesStore, CompanyActionType } from "../Redux/CompanyState";
import { CustomerActionType, customersStore } from "../Redux/CustomerState";
import { CouponActionType, couponsStore } from "../Redux/CouponState";

class AuthService {
    // service to handle all authorization type function


    public async login(userModel: UserModel):Promise<UserModel>{
        
        const url = `${config.baseUrl}${userModel.role.toString().toLowerCase()}/login`;
        const loginModel = new LoginModel(userModel.email, userModel.password);
        const response = await axios.post(url, loginModel);
        const promise = response.data;
        if (promise === "") {
            throw new Error("Email or password are incorrect");
        }
        sessionStorage.setItem("token", promise);
        const client = jwtDecode<UserModel>(promise);
        client.role = client.role as Role;
        authStore.dispatch({type: AuthActionType.Login, payload:client});
        return client;
    }

    public logout(){
        sessionStorage.removeItem("token");
        companiesStore.dispatch({type: CompanyActionType.RemoveState, payload:null});
        customersStore.dispatch({type: CustomerActionType.RemoveState, payload:null});
        couponsStore.dispatch({type: CouponActionType.RemoveState, payload:null});
        authStore.dispatch({type: AuthActionType.Logout, payload: null});
    }

    // public hashPassword(password: string) {
    //     return crypto.createHmac("sha256", config.secretKey).update(password).digest();
    // }
}

const authService = new AuthService();
export default authService;