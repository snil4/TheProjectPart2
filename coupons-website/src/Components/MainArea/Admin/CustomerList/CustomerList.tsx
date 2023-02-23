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
        <div className="CustomerList">
			{customers.map((c) => <CustomerCard key={c.id} customer={c}/>)}
            <NavLink className="Add" to="/customer/add">Add Customer</NavLink>        </div>
    );
}

export default CustomerList;
