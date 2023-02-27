import { useForm } from "react-hook-form";
import CouponModel from "../../../../../Models/CouponModel";
import "./AddCoupon.css";

function AddCoupon(): JSX.Element {

    const { register, handleSubmit } = useForm<CouponModel>();

    function send(coupon: CouponModel) {

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
                <input type="number" placeholder="Price" {...register("price")}/>
                <label htmlFor="image">Image: </label>
                <input type="file" placeholder="Image" {...register("image")}/>
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddCoupon;
