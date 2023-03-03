import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import { CouponActionType, couponsStore } from "../Redux/CouponState";
import config from "../Utils/Config";
import authService from "./AuthService";

class CustomerService {
    // Method for each function on server-side to handle responses from the back-end

    public async getCustomerDetails(): Promise<CustomerModel>{
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const promise = await axios.get<CustomerModel>(config.customerUri, {headers: header});
        return promise.data;
    }

    public async getAllCoupons(): Promise<CouponModel[]>{
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CouponModel[]>(config.customerCouponUrl, {headers: header});
        const coupons = response.data;
        couponsStore.dispatch({type: CouponActionType.GetCoupons, payload: coupons});
        return response.data;
    }

    public async purchaseCoupon(coupon: CouponModel): Promise<CouponModel> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.post<CouponModel>(config.customerCouponUrl, {headers: header});
        const addedCoupon = response.data;
        couponsStore.dispatch({type: CouponActionType.DeleteCoupon, payload: addedCoupon});
        return addedCoupon;
    }
}

const customerService = new CustomerService();

export default customerService;