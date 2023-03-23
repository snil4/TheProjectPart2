import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CompanyEdit.css";

function CompanyEdit(): JSX.Element {

    const params = useParams();
    const companyId = parseInt(params.companyId);
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, getValues, formState } = useForm<CompanyModel>();
    const [password, setPassword] = useState<string>();

    function returnToLogin() {
        notificationService.error("Token expired, please login again");
        navigate("/login");
    }

    async function send(company: CompanyModel) {
        try {
            if (company.password === "") {
                company.password = password;
            }
            const updatedCompany = await adminService.updateCompany(company);
            notificationService.success("Company edited successfully");
            navigate(`/main/admin/company/${companyId}`);
        } catch (err: any) {
            if (err.message === "Token Expired") {
                returnToLogin();
            }
            notificationService.error(err);
        }
    }

    useEffect(() => {
        (async () => {
            const company = await adminService.getOneCompany(companyId);
            setValue("name", company.name)
            setValue("id", company.id);
            setValue("name", company.name);
            setValue("email", company.email);
            setValue("coupons", company.coupons);
            setPassword(company.password);
        })();
    },[]);

    return (
        <div className="CompanyEdit Edit">
            <form onSubmit={handleSubmit(send)}>
                <p>Id: {companyId} </p>
                <p>Name: {getValues().name} </p>
                <label htmlFor="name">Name:</label><span>{formState.errors?.name?.message}</span>
                <input placeholder="name" {...register("name",{
                    required: {value: true, message: "Company must have a name"}
                })}/>

                <label htmlFor="name">Email:</label><span>{formState.errors?.email?.message}</span>
                <input type="email" placeholder="email" {...register("email",{
                    required: {value: true, message: "Company must have an email to register"},
                    minLength: {value: 5, message: "Email must be longer than 5 characters"}
                })}/>

                <label htmlFor="name">Password:</label><span>{formState.errors?.password?.message}</span>
                <input type="password" placeholder="password" {...register("password", {
                    required: {value: true, message:"Must enter a password"},
                    minLength: {value: 8, message: "Password must be longer than 8 characters"}
                })}/>

                <button>Update Company</button>
            </form>
            <NavLink to={`/main/admin/company/${companyId}`}>Back to company details</NavLink>
        </div>
    );
}

export default CompanyEdit;
