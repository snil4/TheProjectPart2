import { useEffect, useState } from "react";
import CouponModel from "../../../../Models/CouponModel";
import CouponCard from "./CouponCard/CouponCard";
import "./CouponsList.css";
import { NavLink } from "react-router-dom";
import notificationService from "../../../../Services/NotificationService";
import companyService from "../../../../Services/CompanyService";

interface CouponsListProps {
	
}

function CouponsList(props: CouponsListProps): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const list = await companyService.getAllCoupons();
                setCoupons(list);
            } catch (err: any) {
                notificationService.error(err);
            }
    })();},[]);

    return (
    <div className="CouponsList List">
        {coupons.map((c) => <CouponCard key={c.id} coupon={c}/>)}
        <NavLink className="AddButton" to={`/main/company/coupon/add/`}>+</NavLink>
    </div>);
}

export default CouponsList;
