import { NavLink, useNavigate } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import CustomerCard from "./CustomerCard/CustomerCard";
import "./CustomerList.css";
import {useState, useEffect} from "react";

function CustomerList(): JSX.Element {

    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    const navigate = useNavigate();

    function returnToLogin() {
        notificationService.error("Token expired, please login again");
        navigate("/login");
    }

    useEffect(() => {
        // if (!authService.checkExpiration() || authService.getClient().role !== "admin") {
        //     returnToLogin();
        // }
        (async () => {
            try {
                const list = await adminService.getAllCustomers();
                setCustomers(list);
            } catch (err: any) {
                if (err.message === "Token Expired") {
                    returnToLogin();
                } else {
                    notificationService.error(err);
                }
            }
        })();
    },[]);

    return (        
    <div className="CustomerList" id="customer-list-top">
        <div className="List">
            {customers.map((c) => <CustomerCard key={c.id} customer={c}/>)}
        </div>
        <a href="#customer-list-top">top</a>
    </div>);
}

export default CustomerList;
