import { useForm } from "react-hook-form";
import "./PurchaseCoupon.css";

function PurchaseCoupon(): JSX.Element {

    const {register, handleSubmit} = useForm<Number>();

    return (
        <div className="PurchaseCoupon">
			<form>
                <label htmlFor="id">Coupon ID: </label>
                <input type="number" placeholder="ID"/>
            </form>
        </div>
    );
}

export default PurchaseCoupon;
