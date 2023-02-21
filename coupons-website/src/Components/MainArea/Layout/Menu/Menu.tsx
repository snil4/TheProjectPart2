import { NavLink } from "react-router-dom";
import "./Menu.css";

interface MenuProps {
	
}

function Menu(props: MenuProps): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/main">Start Page</NavLink>
            <NavLink to="/activities">Managment Activities</NavLink>
            <NavLink to="/coupon">Coupons List</NavLink>
            <NavLink to="/info">User info</NavLink>
        </div>
    );
}

export default Menu;
