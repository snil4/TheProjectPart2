import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import "./CouponEdit.css";

function CouponEdit(): JSX.Element {

    const params = useParams();
    const couponId = parseInt(params.couponId);

    const {register, handleSubmit, setValue} = useForm<CouponModel>();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const coupon = await companyService.getOneCoupon(couponId);
            if (coupon) {
                setValue("id", coupon.id);
                setValue("title", coupon.title);
                setValue("description", coupon.description);
                setValue("amount", coupon.amount);
                setValue("category", coupon.category);
                setValue("company", coupon.company);
                setValue("customers", coupon.customers);
                setValue("endDate", coupon.endDate);
                setValue("startDate", coupon.startDate);
                setValue("price", coupon.price);
                setValue("image", coupon.image);
            }
        })();
    },[]);

    async function send(coupon: CouponModel){
        try {
            await companyService.updateCoupon(coupon);
            notificationService.success("Updated coupon");
            navigate(`/main/company/coupon/${couponId}`);
        } catch (err:any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="EditCoupon Edit">
			<form onSubmit={handleSubmit(send)}>
                <label htmlFor="title">Title: </label>
                <input placeholder="Title" {...register("title")}/>
                <label htmlFor="description">Description: </label>
                <input placeholder="Description" {...register("description")}/>
                <label htmlFor="expiration">Expiration Date: </label>
                <input type="date" placeholder="Expiration" {...register("endDate")}/>
                <label htmlFor="amount">Amount: </label>
                <input type="number" placeholder="Amount" {...register("amount")}/>
                <label htmlFor="price">Price: </label>
                <input type="number" placeholder="Price" {...register("price")} step="0.01"/>
                <label htmlFor="image">Image: </label>
                <input type="file" placeholder="Image" {...register("image")}/>
                <button>Add</button>
            </form>
            <NavLink to={`/main/company/coupon/${couponId}`}>Back to coupon details</NavLink>
        </div>
    );
}

export default CouponEdit;
