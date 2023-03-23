import CustomerModel from "../../../../Models/CustomerModel";
import { useNavigate } from "react-router-dom";
import "./CustomerAdd.css";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import { useForm } from "react-hook-form";

function CustomerAdd(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CustomerModel>();
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
            <label htmlFor="FirstName" >First Name:</label><span>{formState.errors?.firstName?.message}</span>
			<input placeholder="First Name" {...register("firstName",{
                required: {value: true, message: "Customer must have a first name"}
            })}/>

            <label htmlFor="LastName" >Last Name:</label><span>{formState.errors?.lastName?.message}</span>
			<input placeholder="Last Name" {...register("lastName", {
                required: {value: true, message: "Customer must have a last name"}
            })}/>

            <label htmlFor="Email" >Email:</label><span>{formState.errors?.email?.message}</span>
			<input type="email" placeholder="Email" {...register("email",{
                required: {value: true, message: "Customer must have an email"},
                minLength: {value: 5, message: "Email must be at least 5 characters long"}
            })}/>

            <label htmlFor="Password" >Password:</label><span>{formState.errors?.password?.message}</span>
			<input type="password" placeholder="Password" {...register("password", {
                required: {value: true, message: "Customer must have a password"},
                minLength: {value: 4, message: "Password must be at least 4 characters"}
            })}/>

            <button>Add Customer</button>
        </form>
    </div>);
}

export default CustomerAdd;
