import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import { CouponActionType, couponsStore } from "../Redux/CouponState";
import config from "../Utils/Config";

class CustomerService {
    // Method for each function on server-side to handle responses from the back-end

    public async getCustomerDetails(): Promise<CustomerModel>{
        const promise = await axios.get<CustomerModel>(config.customerUri);
        return promise.data;
    }

    public async getCustomerCoupons(): Promise<CouponModel[]>{
        if (couponsStore.getState().coupons.length === 0) {
            const response = await axios.get<CouponModel[]>(config.customerCouponUrl);
            const coupons = response.data;
            couponsStore.dispatch({type: CouponActionType.GetCoupons, payload: coupons});
        }
        return couponsStore.getState().coupons;
    }

    public async purchaseCoupon(couponId: number): Promise<CouponModel> {
        const response = await axios.post<CouponModel>(`${config.customerCouponUrl}/${couponId}`);
        const addedCoupon = response.data;
        couponsStore.dispatch({type: CouponActionType.DeleteCoupon, payload: addedCoupon});
        return addedCoupon;
    }

    public async getAllCoupons(): Promise<CouponModel[]> {
        const response = await axios.get<CouponModel[]>(config.customerCouponAllUrl);
        return response.data;
    }
}

const customerService = new CustomerService();

export default customerService;