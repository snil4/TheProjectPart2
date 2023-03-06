import authService from "../../../../../Services/AuthService";
import "./Menu.css";
import Task from "./Task/Task";

interface MenuProps {
	
}

function Menu(props: MenuProps): JSX.Element {
    const role = authService.getClient().role.toString();

    if (role === "ADMIN") {
        return (
            <div className="Menu">
                <Task path="/main/start" name="Start Page"/>
                <Task path="/main/admin/company" name="Companies List"/>
                <Task path="/main/admin/customer" name="Customers List"/>
                <Task path="/main/info" name="User Info"/>
            </div>
        );
    } else if (role === "COMPANY") {
        return(
            <div className="Menu">
                <Task path="/main/start" name="Start Page"/>
                <Task path="/main/company/coupon" name="Coupons List"/>
                <Task path="/main/info" name="User Info"/>
            </div>
        );
    } else if (role === "CUSTOMER") {
        return(
            <div className="Menu">
                <Task path="/main/start" name="Start Page"/>
                <Task path="/main/customer/coupon" name="Coupons List"/>
                <Task path="/main/info" name="User Info"/>
            </div>
        );
    }
}

export default Menu;
