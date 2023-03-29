import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../../Models/CouponModel";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";
import "./CouponAdd.css";

function CouponAdd(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CouponModel>();
    const navigate = useNavigate();

    async function send(coupon: CouponModel) {
        try {
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
                <label htmlFor="title">Title: </label><span>{formState.errors?.title?.message}</span>
                <input placeholder="Title" {...register("title",{
                    required: {value: true, message: "Coupon must have a title"},
                    minLength: {value: 2,message: "Title must be longer than 2 characters"}
                    })}/>

                <label htmlFor="description">Description: </label>
                <input placeholder="Description" {...register("description")}/>

                <label htmlFor="expiration">Expiration Date: </label><span>{formState.errors?.endDate?.message}</span>
                <input type="date" placeholder="Expiration" {...register("endDate",{
                    required: {value: true, message: "Coupon must have an expiration date"},
                    min: {value: +Date.now(), message: "The expiration must be at least tommorow"}
                })}/>

                <label htmlFor="amount">Amount: </label><span>{formState.errors?.amount?.message}</span>
                <input type="number" placeholder="Amount" {...register("amount",{
                    required: {value: true, message: "A coupon must have amount number"},
                    min: {value: 1, message: "Coupon's amount must be at least 1"}
                })}/>

                <label htmlFor="price">Price: </label><span>{formState.errors?.price?.message}</span>
                <input type="number" placeholder="Price" {...register("price",{
                    required: {value: true, message:"Coupon must have a price"},
                    min: {value: 0, message: "Price cannot be below 0"}
                })} step="0.01"/>

                <label htmlFor="category">Category: </label>
                <select {...register("category")}>
                    <option value="SPORT">Sport</option>
                    <option value="CLOTHING">Clothing</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="CAMPING">Camping</option>
                </select>

                <label htmlFor="image">Image: </label>
                <input type="file" placeholder="Image" {...register("image")} accept="image/*"/>

                <button>Add</button>
            </form>
        </div>
    );
}

export default CouponAdd;
