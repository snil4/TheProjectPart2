import { useEffect, useState } from "react";
import CouponModel from "../../../../Models/CouponModel";
import customerService from "../../../../Services/CustomerService";
import notificationService from "../../../../Services/NotificationService";
import "./PurchaseCoupon.css";
import CouponCard from "./CouponCard/CouponCard";

function PurchaseCoupon(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>();

    useEffect(() => {
        (async () => {
            try {
                const newCoupons = await customerService.getAllCoupons();
                setCoupons(newCoupons);
            } catch (err: any) {
                notificationService.error(err.message);
            }
        }
    )();},[]);

    return (
        <div className="PurchaseCoupon">
            {coupons && coupons.map((c) => <CouponCard key={c.id} coupon={c}/>)}
        </div>
    );
}

export default PurchaseCoupon;
