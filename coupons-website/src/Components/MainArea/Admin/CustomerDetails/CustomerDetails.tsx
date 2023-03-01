import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import authService from "../../../../Services/AuthService";
import notificationService from "../../../../Services/NotificationService";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const params = useParams();
    const customerId: number = parseInt(params.customerId);
    const navigate = useNavigate();

    const [customer, setCustomer] = useState<CustomerModel>();

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
                const customer = await adminService.getOneCustomer(customerId);
                setCustomer(customer);
            } catch (err: any) {
                if (err.message === "Token Expired") {
                    returnToLogin();
                } else {
                    notificationService.error(err.message);
                }
            }
        })();
    },[]);

    if (customer) {
            return (
            <div className="CustomerDetails">
                <p>ID: {customer.id}</p>
                <p>First Name: {customer.firstName}</p>
                <p>Last Name: {customer.lastName}</p>
                <p>Email: {customer.email}</p>
                <NavLink to={`/main/admin/customer/edit/${customerId}`}>Edit customer</NavLink>
                <NavLink to="/main/admin/customer">Back to customers list</NavLink>
            </div>
        );
    }
}

export default CustomerDetails;
