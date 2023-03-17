import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import customerService from "../../../../Services/CustomerService";
import notificationService from "../../../../Services/NotificationService";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {

    const params = useParams();
    const couponId = parseInt(params.couponId);

    const [coupon, setCoupon] = useState<CouponModel>();

    useEffect(() => {
        (async () => {
            try {
                const newCoupon = await customerService.getOneCoupon(couponId);
                setCoupon(newCoupon);
            } catch (err: any) {
                notificationService.error(err.message);
            }
        })();
    },[]);

    return (
        <div className="CouponDetails">
            {coupon && <div className="Card">
                <p>Name: {coupon.title}</p>
                <p>Category: {coupon.category}</p>
                <p>Description: {coupon.description}</p>
                <p>Price: {coupon.price}</p>
                <p>Company: {coupon.company.name}</p>
            </div>}
			<NavLink to="/main/customer/coupon">Back to coupons list</NavLink>
        </div>
    );
}

export default CouponDetails;
