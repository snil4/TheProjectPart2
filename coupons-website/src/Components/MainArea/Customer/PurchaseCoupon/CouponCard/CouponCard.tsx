import CouponModel from "../../../../../Models/CouponModel";
import customerService from "../../../../../Services/CustomerService";
import notificationService from "../../../../../Services/NotificationService";
import "./CouponCard.css";

interface CouponCardProps {
	coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {

    async function PurchaseCoupon() {
        try {
            await customerService.purchaseCoupon(props.coupon.id);
            notificationService.success("coupon purhased");

        } catch (err: any) {
            notificationService.error(err.message);
        }
    }

    return (
        <button onClick={PurchaseCoupon}>
            <div className="CouponCard Card">
                <p>ID: {props.coupon.id}</p>
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
