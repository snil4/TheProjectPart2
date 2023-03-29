import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const params = useParams();
    const companyId = parseInt(params.companyId);
    const navigate = useNavigate();

    const [company, setCompany] = useState<CompanyModel>();

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
                console.log(companyId);
                const company = await adminService.getOneCompany(companyId);
                setCompany(company);
            } catch (err: any) {
                if (err.message === "Token Expired") {
                    returnToLogin();
                } else {
                    notificationService.error(err.message);
                }
            }
        })();
    },[]);

    async function deleteCompany() {
        if (window.confirm(`Are you sure you want to delete ${company.name}?`)) {
            try {
                await adminService.deleteCompany(companyId);
                notificationService.success("Company deleted");
                navigate("/main/admin/company");
            } catch (err: any) {
                notificationService.error(err.message);
            }
        }
    }
    
    return (
        <div className="CompanyDetails flex flex-col justify-center items-center">
            {company &&
			<div className="Details">
                <p>ID: {company.id}</p>
                <p className=" text-amber-600">-----</p>
                <p>Name: {company.name}</p>
                <p className=" text-amber-600">-----</p>
                <p>Email: {company.email}</p>
                <p className=" text-amber-600">-----</p>
                <NavLink to={`/main/admin/company/edit/${companyId}`} className="border border-green-400 rounded-lg bg-gray-100 py-1.5 mx-1">Edit company</NavLink>
                <button onClick={deleteCompany} className="border border-green-400 rounded-lg bg-gray-100 mx-1">Delete company</button>
            </div>}
            <br/><NavLink to="/main/admin/company" className="">Back to companies list</NavLink>
        </div>
    );
}

export default CompanyDetails;
