import "./CompanyAdd.css";
import { useForm } from "react-hook-form";
import CompanyModel from "../../../../Models/CompanyModel";
import notificationService from "../../../../Services/NotificationService";
import adminService from "../../../../Services/AdminService";
import { useNavigate } from "react-router-dom";

function CompanyAdd(): JSX.Element {

    const {register, handleSubmit} = useForm<CompanyModel>();
    const navigate = useNavigate();

    async function send(company: CompanyModel) {
        company.id = 0;
        console.log(company);
        try {
            await adminService.addCompany(company);
            notificationService.success("Company added");
            navigate("/main/admin/company");
        } catch (err: any) {
            notificationService.error(err);
        }
    }

    return (<div className="CompanyAdd">
    <form onSubmit={handleSubmit(send)}>
        <label htmlFor="name">Name:</label>
        <input placeholder="name" {...register("name")}/>
        <label htmlFor="name">Email:</label>
        <input type="email" placeholder="email" {...register("email")}/>
        <label htmlFor="name">Password:</label>
        <input type="password" placeholder="password" {...register("password")}/>
        <button>Add Company</button>
    </form>
</div>);
}

export default CompanyAdd;
