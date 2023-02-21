import CouponModel from "./CouponModel";

class CompanyModel{
    id: number;
    name: string;
    email: string;
    password: string;
    coupons: CouponModel[];
}

export default CompanyModel;