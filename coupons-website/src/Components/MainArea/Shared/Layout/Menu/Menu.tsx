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
                <Task path="/main/start" name="Start Page"/>
                <Task path="/main/admin/company" name="Companies List"/>
                <Task path="/main/admin/customer" name="Customers List"/>
                <Task path="/main/info" name="User Info"/>
            </div>
        );
    } else if (role === "company") {
        return;
    } else if (role === "customer") {
        return;
    }
}

export default Menu;
