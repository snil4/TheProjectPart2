import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import authService from "../../../../Services/AuthService";
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

    if (company) {
    return (
        <div className="CompanyDetails Details">
			<div>
                <p>ID: {company.id}</p>
                <p>Name: {company.name}</p>
                <p>Email: {company.email}</p>
                <NavLink to={`/main/admin/company/edit/${companyId}`}>Edit company</NavLink>
            </div>
            <NavLink to="/main/admin/company">Back to companies list</NavLink>
        </div>
    );
    }
}

export default CompanyDetails;
