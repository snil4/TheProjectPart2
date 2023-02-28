import { NavLink } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import CustomerCard from "./CustomerCard/CustomerCard";
import "./CustomerList.css";
import {useState, useEffect} from "react";

function CustomerList(): JSX.Element {

    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const list = await adminService.getAllCustomers();
                setCustomers(list);
            } catch (err: any) {
                notificationService.error(err);
            }
        })();
    },[]);

    return (        
    <div className="CustomerList List">
        {customers.map((c) => <CustomerCard key={c.id} customer={c}/>)}
        <NavLink className="Add" to="/main/admin/customer/add">+</NavLink>
    </div>);
}

export default CustomerList;
