import CouponModel from "./CouponModel";

class CustomerModel{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    coupons: CouponModel[];
}

export default CustomerModel;