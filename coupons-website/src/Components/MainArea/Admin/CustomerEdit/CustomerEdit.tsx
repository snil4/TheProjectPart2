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

    const { register, handleSubmit, setValue, formState } = useForm<CustomerModel>();
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
            await adminService.updateCustomer(customer);
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
        <div className="CustomerEdit Edit flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(send)} className="AddMenu bg-teal-400">
                <p>Id: {customerId} </p>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="FirstName" >First Name:</label><span>{formState.errors?.firstName?.message}</span>
                <input placeholder="First Name" {...register("firstName",{
                    required: {value: true, message: "Customer must have a first name"}
                })}/>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="LastName" >Last Name:</label><span>{formState.errors?.lastName?.message}</span>
                <input placeholder="Last Name" {...register("lastName", {
                    required: {value: true, message: "Customer must have a last name"}
                })}/>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="Email" >Email:</label><span>{formState.errors?.email?.message}</span>
                <input type="email" placeholder="Email" {...register("email",{
                    required: {value: true, message: "Customer must have an email"},
                    minLength: {value: 5, message: "Email must be at least 5 characters long"}
                })}/>
                <p className=" text-amber-600">-----</p>

                <label htmlFor="Password" >Password:</label><span>{formState.errors?.password?.message}</span>
                <input type="password" placeholder="Password" {...register("password", {
                    required: {value: false, message: "Customer must have a password"},
                    minLength: {value: 4, message: "Password must be at least 4 characters"}
                })}/>
                <p className=" text-amber-600">-----</p>

                <button className="border border-teal-100 bg-lime-400 hover:bg-lime-300 h-12 rounded-lg text-blue-600 hover:text-purple-600">Update Customer</button>
            </form>
            <NavLink to={`/main/admin/company/${customerId}`} className="border border-teal-100 bg-lime-500 hover:bg-lime-600 h-12 rounded-lg text-blue-600 hover:text-purple-600">Back to customer details</NavLink>
        </div>
    );
}

export default CustomerEdit;
