import { useEffect, useState } from "react";
import CouponModel from "../../../../Models/CouponModel";
import CouponCard from "./CouponCard/CouponCard";
import "./CouponsList.css";
import notificationService from "../../../../Services/NotificationService";
import companyService from "../../../../Services/CompanyService";
import { useForm } from "react-hook-form";
import SortModel from "../../../../Models/SortModel";

interface CouponsListProps {
	
}

function CouponsList(props: CouponsListProps): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const {register, handleSubmit} = useForm<SortModel>();

    async function send(values:SortModel) {
        try {
            const coupons = await companyService.getCompanyCouponsSorted(values);
            setCoupons(coupons);
        } catch (error) {
            notificationService.error(error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const list = await companyService.getCompanyCoupons();
                setCoupons(list);
            } catch (err: any) {
                notificationService.error(err);
            }
    })();},[]);

    return (
    <div className="CouponsList" id="company-coupons-list-top">
        <form onSubmit={handleSubmit(send)}>
            <label htmlFor="maxprice">Maximum Price: </label>
            <input type="number" placeholder="Maximum Price" step="0.01" {...register("maxPrice")}/>
            <label htmlFor="category">Category: </label>
            <select {...register("category")}>
                <option value="SPORT">Sport</option>
                <option value="CLOTHING">Clothing</option>
                <option value="ELECTRICITY">Electricity</option>
                <option value="CAMPING">Camping</option>
            </select>
            <button className="mx-10 my-20 px-4 border rounded-md bg-lime-400 hover:bg-lime-500">Sort</button>
        </form>

        <div className="List">
            {coupons.map((c) => <CouponCard key={c.id} coupon={c}/>)}
        </div>
        <a href="#company-coupons-list-top">top</a>
    </div>);
}

export default CouponsList;
