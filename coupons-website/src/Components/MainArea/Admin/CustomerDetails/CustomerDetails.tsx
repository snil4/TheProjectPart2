import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
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

    async function deleteCustomer() {
        if (window.confirm(`Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`)) {
            try {
                await adminService.deleteCustomer(customerId);
                notificationService.success("Customer deleted");
                navigate("/main/admin/customer");
            } catch (err: any) {
                notificationService.error(err.message);
            }
        }
    }

    return (
        <div className="CustomerDetails flex flex-col justify-center items-center">
            {customer &&
            <div className="Details">
                <p>ID: {customer.id}</p>
                <p>First Name: {customer.firstName}</p>
                <p>Last Name: {customer.lastName}</p>
                <p>Email: {customer.email}</p>
                <NavLink to={`/main/admin/customer/edit/${customerId}`} className="border border-green-400 rounded-lg bg-gray-100 mx-1">Edit customer</NavLink>
                <button onClick={deleteCustomer} className="border border-green-400 rounded-lg bg-gray-100 mx-1">Delete customer</button>
            </div>}
            <NavLink to="/main/admin/customer">Back to customers list</NavLink>
        </div>
    );
}

export default CustomerDetails;
