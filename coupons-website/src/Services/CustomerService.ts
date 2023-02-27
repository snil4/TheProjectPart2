import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import config from "../Utils/Config";
import authService from "./AuthService";

class CustomerService {
    // Method for each function on server-side to handle responses from the back-end

    public async getCustomerDetails(): Promise<CustomerModel>{
        const header = authService.setAuthHeader();
        const promise = await axios.get<CustomerModel>(`${config.baseUrl}customer`, {headers: header});
        return promise.data;
    }

    public async getAllCoupons(): Promise<CouponModel[]>{
        const header = authService.setAuthHeader();
        const response = await axios.get<CouponModel[]>(`${config.baseUrl}customer/coupon`, {headers: header});
        return response.data;
    }

    public async purchaseCoupon(coupon: CouponModel): Promise<CouponModel> {
        const header = authService.setAuthHeader();
        const response = await axios.post<CouponModel>(`${config.baseUrl}customer/coupon`, {headers: header});
        return response.data;
    }
}

const customerService = new CustomerService();

export default customerService;