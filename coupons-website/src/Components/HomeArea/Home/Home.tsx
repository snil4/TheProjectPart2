import { NavLink } from "react-router-dom";
import CouponAnim from "../../../Assets/CouponAnim.webp";

function Home(): JSX.Element {
    return (
        <div className="Home min-h-screen grid place-items-center font-serif bg-slate-50 dark:bg-slate-600">
            <div className="text-xl">Welcome to the Coupons Co. website.
            This website was made to make your life Cheaper,
            and to make your money even more exciting!</div>
            <img className="w-2/4 object-center" src={CouponAnim} alt="Anim"/><br/>
            <NavLink to="/login" className="border p-5 my-10 rounded-lg justify-center bg-yellow-500 hover:bg-yellow-300 dark:bg-slate-500 dark:hover:bg-slate-400 border-gray-400 font-bold text-3xl text-slate-100">Get started NOW!</NavLink>
        </div>
    );
}

export default Home;
