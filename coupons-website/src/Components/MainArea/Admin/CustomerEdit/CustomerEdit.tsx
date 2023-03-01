import "./CustomerEdit.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService";
import { useForm } from "react-hook-form";
import CustomerModel from "../../../../Models/CustomerModel";
import notificationService from "../../../../Services/NotificationService";

function CustomerEdit(): JSX.Element {
    const params = useParams();
    const customerId = parseInt(params.customerId);
    const navigate = useNavigate();

    const { register, handleSubmit, setValue } = useForm<CustomerModel>();
    const [password, setPassword] = useState<string>();

    function returnToLogin() {
        notificationService.error("Token expired, please login again");
        navigate("/login");
    }

    async function send(customer: CustomerModel) {
        try {
            if (customer.password === "") {
                customer.password = password;
            }
            const updatedCustomer = await adminService.updateCustomer(customer);
            notificationService.success("Company edited successfully");
            navigate(`/main/admin/customer/${customerId}`);
        } catch (err: any) {
            if (err.message === "Token Expired") {
                returnToLogin();
            }
            notificationService.error(err);
        }
    }

    useEffect(() => {
        (async () => {
            const customer = await adminService.getOneCustomer(customerId);
            setValue("id", customer.id);
            setValue("firstName", customer.firstName);
            setValue("lastName", customer.lastName);
            setValue("email", customer.email);
            setValue("coupons", customer.coupons);
            setPassword(customer.password);
        })();
    },[]);

    return (
        <div className="CustomerEdit Edit">
            <form onSubmit={handleSubmit(send)}>
                <p>Id: {customerId} </p>
                <label htmlFor="firstName">First Name:</label>
                <input placeholder="firstName" {...register("firstName")}/>
                <label htmlFor="lastName">Last Name:</label>
                <input placeholder="lastName" {...register("lastName")}/>
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="email" {...register("email")}/>
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="password" {...register("password")}/>
                <button>Edit Customer</button>
            </form>
            <NavLink to={`/main/admin/customer/${customerId}`}>Back to customer details</NavLink>
        </div>
    );
}

export default CustomerEdit;
