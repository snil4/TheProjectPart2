import "./AddCompany.css";
import { useForm } from "react-hook-form";
import CompanyModel from "../../../../../Models/CompanyModel";
import notificationService from "../../../../../Services/NotificationService";
import adminService from "../../../../../Services/AdminService";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Shared/Layout/Layout";

function AddCompany(): JSX.Element {

    const {register, handleSubmit} = useForm<CompanyModel>();
    const navigate = useNavigate();

    async function send(company: CompanyModel) {
        console.log(company);
        try {
            await adminService.addCompany(company);
            notificationService.success("Company added");
            navigate("/company");
        } catch (err: any) {
            notificationService.error(err);
        }
    }

    const element = (        <div className="AddCompany">
            <form onSubmit={handleSubmit(send)}>
                <label htmlFor="name">Name:</label>
                <input placeholder="name" {...register("name")}/>
                <label htmlFor="name">Email:</label>
                <input placeholder="email" {...register("email")}/>
                <label htmlFor="name">Password:</label>
                <input placeholder="password" {...register("password")}/>
                <button>Add Company</button>
            </form>
        </div>)

    return (<Layout component={element}/>);
}

export default AddCompany;
