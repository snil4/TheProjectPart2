import CustomerModel from "../../../../Models/CustomerModel";
import { useNavigate } from "react-router-dom";
import "./CustomerAdd.css";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import authService from "../../../../Services/AuthService";

function CustomerAdd(): JSX.Element {

    const {register, handleSubmit} = useForm<CustomerModel>();
    const navigate = useNavigate();

    function returnToLogin() {
        notificationService.error("Token expired, please login again");
        navigate("/login");
    }

    async function send(customer: CustomerModel) {
        customer.id = 0;
        console.log(customer);
        try {
            await adminService.addCustomer(customer);
            notificationService.success("Customer added");
            navigate("/main/admin/customer");
        } catch (err: any) {
            if (err.message === "Token Expired") {
                returnToLogin();
            } else {
                notificationService.error(err);
            }
        }
    }

    // if (!authService.checkExpiration() || authService.getClient().role !== "admin") {
    //     returnToLogin();
    // }

    return (
    <div className="CustomerAdd">
        <form onSubmit={handleSubmit(send)}>
            <label htmlFor="FirstName" >First Name:</label>
			<input placeholder="First Name" {...register("firstName")}/>
            <label htmlFor="LastName" >Last Name:</label>
			<input placeholder="Last Name" {...register("lastName")}/>
            <label htmlFor="Email" >Email:</label>
			<input type="email" placeholder="Email" {...register("email")}/>
            <label htmlFor="Password" >Password:</label>
			<input type="password" placeholder="Password" {...register("password")}/>
            <button>Add</button>
        </form>
    </div>);
}

export default CustomerAdd;