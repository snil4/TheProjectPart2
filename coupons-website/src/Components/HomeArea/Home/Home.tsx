import { NavLink } from "react-router-dom";
import "./Home.css";
import CouponAnim from "../../../Assets/CouponAnim.webp";

function Home(): JSX.Element {
    return (
        <div className="Home">
			<NavLink to="/login">Login</NavLink>
            <div>Welcome to the Coupons Co. website.</div>
            <div>This website was made to make your life Cheaper,</div>
            <div>and to make your money even more exciting!</div>
            <img src={CouponAnim} alt="Anim"/><br/>
            <NavLink to="/login">Get started NOW!</NavLink>
        </div>
    );
}

export default Home;
