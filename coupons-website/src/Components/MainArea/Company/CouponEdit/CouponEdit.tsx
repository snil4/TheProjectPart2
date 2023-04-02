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

    const {register, handleSubmit, setValue, formState} = useForm<CouponModel>();
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
        <div className="EditCoupon Edit flex flex-col justify-center items-center">
			<form onSubmit={handleSubmit(send)} className="AddMenu bg-teal-400">
                <label>Id: {couponId}</label>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="title">Title: </label><span>{formState.errors?.title?.message}</span>
                <input placeholder="Title" {...register("title",{
                    required: {value: true, message: "Coupon must have a title"},
                    minLength: {value: 2,message: "Title must be longer than 2 characters"}
                })}/>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="description">Description: </label>
                <input placeholder="Description" {...register("description")}/>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="expiration">Expiration Date: </label><span>{formState.errors?.endDate?.message}</span>
                <input type="date" placeholder="Expiration" {...register("endDate",{
                    required: {value: true, message: "Coupon must have an expiration date"},
                    min: {value: +Date.now(), message: "The expiration must be at least tommorow"}
                })}/>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="amount">Amount: </label><span>{formState.errors?.amount?.message}</span>
                <input type="number" placeholder="Amount" {...register("amount",{
                    required: {value: true, message: "A coupon must have amount number"},
                    min: {value: 1, message: "Coupon's amount must be at least 1"}
                })}/>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="price">Price: </label><span>{formState.errors?.price?.message}</span>
                <input type="number" placeholder="Price" {...register("price",{
                    required: {value: true, message:"Coupon must have a price"},
                    min: {value: 0, message: "Price cannot be below 0"}
                })} step="0.01"/>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="category">Category: </label>
                <select {...register("category")}>
                    <option value="SPORT">Sport</option>
                    <option value="CLOTHING">Clothing</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="CAMPING">Camping</option>
                </select>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="image">Image: </label>
                <input type="file" placeholder="Image" {...register("image")} accept="image/*"/>
                <p className=" text-amber-600">-----</p>

                <button className="border border-teal-100 bg-lime-400 hover:bg-lime-300 h-12 rounded-lg text-blue-600 hover:text-purple-600">Update Coupon</button>
            </form>
            <NavLink to={`/main/admin/company/${couponId}`} className="border border-teal-100 bg-lime-500 hover:bg-lime-600 h-12 rounded-lg text-blue-600 hover:text-purple-600">Back to coupon details</NavLink>
            </div>
    );
}

export default CouponEdit;
