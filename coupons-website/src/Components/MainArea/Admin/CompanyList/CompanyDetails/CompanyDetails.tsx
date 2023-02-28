import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../../../Models/CompanyModel";
import adminService from "../../../../../Services/AdminService";
import notificationService from "../../../../../Services/NotificationService";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const params = useParams();
    const companyId = +params.companyId;

    const [compnay, setCompany] = useState<CompanyModel>();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const company = await adminService.getOneCompany(companyId);
                setCompany(company);
            } catch (err: any) {
                notificationService.error(err.message);
            }
        })();
    },[]);

    return (
        <div className="CompanyDetails Details">
			<div>
                
                <NavLink to={`/main/admin/company/edit/${companyId}`}>Edit company</NavLink>
            </div>
            <NavLink to="/main/admin/company">Back to companies list</NavLink>
        </div>
    );
}

export default CompanyDetails;
