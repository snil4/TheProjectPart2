import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import "./CouponAdd.css";

function CouponAdd(): JSX.Element {

    const { register, handleSubmit } = useForm<CouponModel>();
    const navigate = useNavigate();

    async function send(coupon: CouponModel) {
        try {
            coupon.image = (coupon.image as FileList)[0];
            coupon.startDate = new Date(Date.now());
            await companyService.addCoupon(coupon);
            notificationService.success("Coupon added");
            navigate(`/main/company/coupon`);
        } catch (err:any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="AddCoupon">
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
                <label htmlFor="category">Category: </label>
                <select {...register("category")}>
                    <option value="SPORT">Sport</option>
                    <option value="CLOTHING">Clothing</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="CAMPING">Camping</option>
                </select>
                <label htmlFor="image">Image: </label>
                <input type="file" placeholder="Image" {...register("image")}/>
                <button>Add</button>
            </form>
        </div>
    );
}

export default CouponAdd;
