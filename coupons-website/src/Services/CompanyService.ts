import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";
import { CouponActionType, couponsStore } from "../Redux/CouponState";
import config from "../Utils/Config";
import SortModel from "../Models/SortModel";

class CompanyService {
    // Method for each function on server-side to handle responses from the back-end

    public async getCompanyDetails(): Promise<CompanyModel> {
        const response = await axios.get<CompanyModel>(config.companyUri);
        return response.data;
    }

    public async getCompanyCoupons(): Promise<CouponModel[]> {
        if (couponsStore.getState().coupons.length === 0) {
            const response = await axios.get<CouponModel[]>(config.companyCouponsUrl);
            const coupons = response.data;
            console.log(coupons);
            couponsStore.dispatch({type: CouponActionType.GetCoupons, payload: coupons});
        }
        return couponsStore.getState().coupons;
    }

    public async getCompanyCouponsSorted(values:SortModel): Promise<CouponModel[]> {
        if (values.maxPrice > 0 || values.category !== "NONE") {
            return (await axios.get<CouponModel[]>(config.companyCouponsUrl + "/sorted?maxPrice=" + values.maxPrice + "&category=" + values.category)).data;
        }
        return this.getCompanyCoupons();
    }

    public async getOneCoupon(id: number): Promise<CouponModel> {
        const response = await axios.get<CouponModel>(`${config.companyCouponsUrl}/${id}`);
        return response.data;
    }

    public async addCoupon(coupon: CouponModel) {
        if (coupon.image[0]) {
            coupon.imageName = await this.uploadImage(coupon.image);
        }
        delete coupon.image;
        
        coupon.startDate = new Date(Date.now());
        const response = await axios.post(config.companyCouponsUrl,coupon);
        const addedCoupon = response.data;
        couponsStore.dispatch({type:CouponActionType.AddCoupon, payload:addedCoupon});
        return addedCoupon;
    }

    public async uploadImage(image: FileList) {
        const formData = new FormData();
        formData.append("image", image[0]);
        const response = await axios.post(config.imageUrl,formData);
        return response.data;
    }

    public async updateCoupon(coupon: CouponModel) {
        if (coupon.image[0]) {
            coupon.imageName = await companyService.uploadImage(coupon.image);
        }
        delete coupon.image;
        const response = await axios.put(config.companyCouponsUrl,coupon);
        const updatedCoupon = response.data;
        couponsStore.dispatch({type:CouponActionType.UpdateCoupon, payload:updatedCoupon});
        return updatedCoupon;
    }

    public async deleteCoupon(id: number) {
        const response = await axios.delete(`${config.companyCouponsUrl}/${id}`);
        couponsStore.dispatch({type: CouponActionType.DeleteCoupon, payload: id});
        return response.data;
    }

}

const companyService = new CompanyService();

export default companyService;