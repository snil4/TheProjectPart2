import { NavLink } from "react-router-dom";
import "./Menu.css";

interface MenuProps {
	
}

function Menu(props: MenuProps): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/main">Start Page</NavLink><br/>
            <NavLink to="/activities">Managment Activities</NavLink><br/>
            <NavLink to="/coupon">Coupons List</NavLink><br/>
        </div>
    );
}

export default Menu;
