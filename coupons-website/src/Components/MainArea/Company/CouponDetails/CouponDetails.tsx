import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {

    const params = useParams();
    const couponId = parseInt(params.couponId);

    const [coupon, setCoupon] = useState<CouponModel>();

    useEffect(() => {
        (async () => {
            try {
                const newCoupon = await companyService.getOneCoupon(couponId);
                setCoupon(newCoupon);
            } catch (err: any) {
                notificationService.error(err);
            }
    })();},[]);

    return (
        <div className="CouponDetails">
            {coupon &&
            <div className="Details">
                <p>ID: {coupon.id}</p>
                <p>Title: {coupon.title}</p>
                <p>Category: {coupon.category}</p>
                <p>Price: {coupon.price}₪</p>
                <p>Amount: {coupon.amount}</p>
                <p>End Date: {coupon.endDate.toString()}</p>
            </div>}
            <NavLink to={`/main/company/coupon/edit/${couponId}`}>Edit coupon</NavLink>
			<NavLink to="/main/company/coupon">Back to coupons list</NavLink>
        </div>
    );
}

export default CouponDetails;
