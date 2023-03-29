import { useNavigate } from "react-router-dom";
import CouponModel from "../../../../../Models/CouponModel";
import customerService from "../../../../../Services/CustomerService";
import notificationService from "../../../../../Services/NotificationService";
import "./CouponCard.css";

interface CouponCardProps {
	coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {

    const navigate = useNavigate();

    async function PurchaseCoupon() {
        if (window.confirm(`Are you sure you want to purchase ${props.coupon.title} coupon?`)) {
            try {
                await customerService.purchaseCoupon(props.coupon.id);
                notificationService.success("coupon purhased");
                navigate("/main/customer/coupon");
            } catch (err: any) {
                notificationService.error(err);
            }
        }  
    }

    return (
        <button onClick={PurchaseCoupon}>
            <div className="CouponCard Card shadow-md bg-lime-100">
                <p>Title: {props.coupon.title}</p>
                <p>Category: {props.coupon.category}</p>
                <p>Price: {props.coupon.price}₪</p>
                <p>Amount: {props.coupon.amount}</p>
                <p>End Date: {props.coupon.endDate.toString()}</p>
            </div>
        </button>
    );
}

export default CouponCard;
