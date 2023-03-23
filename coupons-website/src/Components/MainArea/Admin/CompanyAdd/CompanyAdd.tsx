import "./CompanyAdd.css";
import { useForm } from "react-hook-form";
import CompanyModel from "../../../../Models/CompanyModel";
import notificationService from "../../../../Services/NotificationService";
import adminService from "../../../../Services/AdminService";
import { useNavigate } from "react-router-dom";

function CompanyAdd(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CompanyModel>();
    const navigate = useNavigate();
    
    function returnToLogin() {
        notificationService.error("Token expired, please login again");
        navigate("/login");
    }

    async function send(company: CompanyModel) {
        company.id = 0;
        console.log(company);
        try {
            await adminService.addCompany(company);
            notificationService.success("Company added");
            navigate("/main/admin/company");
        } catch (err: any) {
            if (err.message === "Token Expired") {
                returnToLogin();
            } else {
                notificationService.error(err);
            }
        }
    }

    // useEffect(() => {
    //     if (!authService.checkExpiration() || authService.getClient().role !== "admin") {
    //         returnToLogin();
    //     }
    // }, []);

    return (<div className="CompanyAdd">
    <form onSubmit={handleSubmit(send)}>
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

        <button>Add Company</button>
    </form>
</div>);
}

export default CompanyAdd;
