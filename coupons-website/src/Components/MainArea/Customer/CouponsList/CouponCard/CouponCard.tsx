import { useState } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../../../Models/CouponModel";
import config from "../../../../../Utils/Config";
import "./CouponCard.css";

interface CouponCardProps {
	coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {

    const [imageUrl, setImageUrl] = useState<string>();

    if (props.coupon.image) {
        setImageUrl(config.imageUrl + (props.coupon.image[0] as File).name);
    }

    return (
        <NavLink to={props.coupon.id.toString()} className="CouponCard">
            <div className="Card">
                <p>Name: {props.coupon.title}</p>
                <p>Category: {props.coupon.category}</p>
                {props.coupon.image && <img src={imageUrl}/>}
            </div>
        </NavLink>
    );
}

export default CouponCard;
