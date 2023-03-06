import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import "./CouponEdit.css";

function CouponEdit(): JSX.Element {

    const params = useParams();
    const couponId = parseInt(params.couponId);

    const {register, handleSubmit} = useForm<CouponModel>();
    const navigate = useNavigate();

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
        </div>
    );
}

export default CouponEdit;
