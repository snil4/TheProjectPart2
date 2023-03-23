import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import config from "../../../../Utils/Config";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {

    const params = useParams();
    const couponId = parseInt(params.couponId);

    const [coupon, setCoupon] = useState<CouponModel>();
    const [imageUrl, setImageUrl] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const newCoupon = await companyService.getOneCoupon(couponId);
                setCoupon(newCoupon);
                setImageUrl(config.imageUrl+newCoupon.imageName);
            } catch (err: any) {
                notificationService.error(err);
            }
    })();},[]);

    async function deleteCoupon() {
        if (window.confirm(`Are you sure you want to delete ${coupon.title}?`)) {
            try {
                await companyService.deleteCoupon(couponId);
                notificationService.success("Coupon deleted");
                navigate("/main/company/coupon");
            } catch (err: any) {
                notificationService.error(err.message);
            }
        }
    }

    return (
        <div className="CouponDetails">
            {coupon &&
            <div className="Details">
                <p>Title: {coupon.title}</p>
                <p>Category: {coupon.category}</p>
                <p>Price: {coupon.price}₪</p>
                <p>Amount: {coupon.amount}</p>
                <p>Expiration Date: {coupon.endDate.toString()}</p>
                <p>Description: {coupon.description}</p>
                {coupon.imageName && <img src={imageUrl}/>}
                <p>ID: {coupon.id}</p>
                <NavLink to={`/main/company/coupon/edit/${couponId}`}>Edit coupon</NavLink>
                <button onClick={deleteCoupon}>Delete coupon</button>
            </div>}
			<NavLink to="/main/company/coupon">Back to coupons list</NavLink>
        </div>
    );
}

export default CouponDetails;
