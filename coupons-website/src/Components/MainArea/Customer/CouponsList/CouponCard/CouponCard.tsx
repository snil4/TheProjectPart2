import CouponModel from "../../../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponCardProps {
	coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    return (
        <div className="CouponCard">
			{props.coupon.title}
        </div>
    );
}

export default CouponCard;
