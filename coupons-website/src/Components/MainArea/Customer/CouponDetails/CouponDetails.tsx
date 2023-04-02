import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import customerService from "../../../../Services/CustomerService";
import notificationService from "../../../../Services/NotificationService";
import config from "../../../../Utils/Config";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {

    const params = useParams();
    const couponId = parseInt(params.couponId);
    
    const [imageUrl, setImageUrl] = useState<string>();
    const [coupon, setCoupon] = useState<CouponModel>();

    useEffect(() => {
        (async () => {
            try {
                const newCoupon = await customerService.getOneCoupon(couponId);
                setCoupon(newCoupon);
                setImageUrl(config.imageUrl + newCoupon.imageName);
            } catch (err: any) {
                notificationService.error(err.message);
            }
        })();
    },[]);

    return (
        <div className="CouponDetails flex flex-col justify-center items-center">
            {coupon && <div className="Details bg-teal-200">
                <p>Name: {coupon.title}</p>
                <p className=" text-amber-600">-----</p>
                <p>Category: {coupon.category}</p>
                <p className=" text-amber-600">-----</p>
                <p>Description: {coupon.description}</p>
                <p className=" text-amber-600">-----</p>
                <p>Price: {coupon.price}</p>
                <p className=" text-amber-600">-----</p>
                <p>Company: {coupon.company.name}</p>
                {coupon.imageName && <img src={imageUrl}/>}
            </div>}
			<NavLink to="/main/customer/coupon">Back to coupons list</NavLink>
        </div>
    );
}

export default CouponDetails;
