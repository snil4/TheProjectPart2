import { NavLink } from "react-router-dom";
import CouponModel from "../../../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponCardProps {
	coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    return (
        <NavLink to={`${props.coupon.id}`}>
            <div className="CouponCard Card">
                <p>ID: {props.coupon.id}</p>
                <p>Title: {props.coupon.title}</p>
                <p>Category: {props.coupon.category}</p>
                <p>Price: {props.coupon.price}₪</p>
                <p>Amount: {props.coupon.amount}</p>
                <p>End Date: {props.coupon.endDate.toString()}</p>
            </div>
        </NavLink>
    );
}

export default CouponCard;
