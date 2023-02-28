import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const params = useParams();
    const customerId: number = parseInt(params.customerId);

    const [customer, setCustomer] = useState<CustomerModel>();

    useEffect(() => {
        (async () => {
            try {
                const customer = await adminService.getOneCustomer(customerId);
                setCustomer(customer);
            } catch (err: any) {
                notificationService.error(err.message);
            }
        })();
    },[])

    if (customer) {
            return (
            <div className="CustomerDetails">
                <p>ID: {customer.id}</p>
                <p>First Name: {customer.firstName}</p>
                <p>Last Name: {customer.lastName}</p>
                <p>Email: {customer.email}</p>
            </div>
        );
    }
}

export default CustomerDetails;
