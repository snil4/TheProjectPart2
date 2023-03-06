import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CouponModel, { Category } from "../Models/CouponModel";
import { CouponActionType, couponsStore } from "../Redux/CouponState";
import config from "../Utils/Config";
import authService from "./AuthService";

class CompanyService {
    // Method for each function on server-side to handle responses from the back-end

    public async getCompanyDetails(): Promise<CompanyModel> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CompanyModel>(config.companyUri, {headers: header});
        return response.data;
    }

    public async getAllCoupons(): Promise<CouponModel[]> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        if (couponsStore.getState().coupons.length === 0) {
            const header = authService.setAuthHeader();
            const response = await axios.get<CouponModel[]>(config.companyCouponsUrl, {headers: header});
            const coupons = response.data;
            couponsStore.dispatch({type: CouponActionType.GetCoupons, payload: coupons});
        }
        return couponsStore.getState().coupons;
    }

    // TODO
    public async getAllCouponsMaxPrice(maxPrice: number): Promise<CouponModel[]> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CouponModel[]>(config.companyCouponsUrl + `?maxPrice=${maxPrice}`, {headers: header});
        return response.data;
    }

    public async getAllCouponsCategory(category: Category): Promise<CouponModel[]> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CouponModel[]>(config.companyCouponsUrl + `?category=${category}`,{headers: header});
        return response.data;
    }

    public async getAllCouponsMaxPriceCategory(maxPrice: number, category: Category): Promise<CouponModel[]> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CouponModel[]>(config.companyCouponsUrl + `?maxPrice=${maxPrice}&category=${category}`, {headers: header});
        return response.data;
    }

    public async getOneCoupon(id: number): Promise<CouponModel> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CouponModel>(`${config.companyCouponsUrl}/${id}`, {headers: header});
        return response.data;
    }

    public async addCoupon(coupon: CouponModel) {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();

        coupon.image = coupon.image as string;
        const response = await axios.post<CouponModel>(config.companyCouponsUrl,coupon, {headers: header});
        const addedCoupon = response.data;
        couponsStore.dispatch({type:CouponActionType.AddCoupon, payload:addedCoupon});
        return addedCoupon;
    }

    public async updateCoupon(coupon: CouponModel) {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.put(config.companyCouponsUrl,coupon, {headers: header});
        const updatedCoupon = response.data;
        couponsStore.dispatch({type:CouponActionType.UpdateCoupon, payload:updatedCoupon});
        return updatedCoupon;
    }

    public async deleteCoupon(id: number) {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.delete(`${config.companyCouponsUrl}/${id}`, {headers: header});
        couponsStore.dispatch({type: CouponActionType.DeleteCoupon, payload: id});
        return response.data;
    }

}

const companyService = new CompanyService();

export default companyService;