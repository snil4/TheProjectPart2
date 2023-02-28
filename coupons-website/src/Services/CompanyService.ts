import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";
import config from "../Utils/Config";
import authService from "./AuthService";

class CompanyService {
    // Method for each function on server-side to handle responses from the back-end

    public async getCompanyDetails(): Promise<CompanyModel> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CompanyModel>(`${config.baseUrl}company`, {headers: header});
        return response.data;
    }

    public async getAllCoupons(): Promise<CouponModel[]> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CouponModel[]>(`${config.baseUrl}company/coupon`, {headers: header});
        return response.data;
    }

    public async getOneCoupon(id: number): Promise<CouponModel> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CouponModel>(`${config.baseUrl}company/coupon/${id}`, {headers: header});
        return response.data;
    }

    public async addCoupon(coupon: CouponModel) {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.post(`${config.baseUrl}company/coupon`,coupon, {headers: header});
        return response.data;
    }

    public async updateCoupon(coupon: CouponModel) {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.put(`${config.baseUrl}company/coupon`,coupon, {headers: header});
        return response.data;
    }

    public async deleteCoupon(id: number) {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.delete(`${config.baseUrl}company/coupon/${id}`, {headers: header});
        return response.data;
    }

}

const companyService = new CompanyService();

export default companyService;