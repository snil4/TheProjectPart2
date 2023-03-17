import { NavLink } from "react-router-dom";
import CouponModel from "../../../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponCardProps {
	coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    return (
        <NavLink to={props.coupon.id.toString()} className="CouponCard Card">
			{props.coupon.title}
        </NavLink>
    );
}

export default CouponCard;
