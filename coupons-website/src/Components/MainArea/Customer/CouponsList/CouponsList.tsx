import { useEffect, useState } from "react";
import CouponModel from "../../../../Models/CouponModel";
import CouponCard from "./CouponCard/CouponCard";
import "./CouponsList.css";
import { NavLink } from "react-router-dom";
import notificationService from "../../../../Services/NotificationService";
import customerService from "../../../../Services/CustomerService";

function CouponsList(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const list = await customerService.getAllCoupons();
                setCoupons(list);
            } catch (err: any) {
                notificationService.error(err);
            }
    })();},[]);

    return (
    <div className="CouponsList">
        {coupons.map((c) => <CouponCard key={c.id} coupon={c}/>)}
        <NavLink className="Add" to="/main/customer/coupon/purchase">+</NavLink>
    </div>);
}

export default CouponsList;
