import { NavLink } from "react-router-dom";
import authService from "../../../../../Services/AuthService";
import "./Menu.css";
import Task from "./Task/Task";

interface MenuProps {
	
}

function Menu(props: MenuProps): JSX.Element {
    const role = authService.getClient().role.toLowerCase();

    if (role === "admin") {
        return (
            <div className="Menu">
                <Task path="/main" name="Start Page"/>
                <Task path="/admin/company" name="Companies List"/>
                <Task path="/admin/customer" name="Customers List"/>
                <Task path="/info" name="User Info"/>
            </div>
        );
    } else if (role === "company") {
        return;
    } else if (role === "customer") {
        return;
    }
}

export default Menu;
