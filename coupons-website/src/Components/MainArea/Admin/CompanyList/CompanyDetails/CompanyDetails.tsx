import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../../../Models/CompanyModel";
import adminService from "../../../../../Services/AdminService";
import notificationService from "../../../../../Services/NotificationService";
import "./CompanyDetails.css";

interface CompanyDetailsProps {
	
}

function CompanyDetails(props: CompanyDetailsProps): JSX.Element {

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
        })
    },[]);

    return (
        <div className="CompanyDetails Details">
			
            <NavLink to="/main/admin/company">Back to companies list</NavLink>
        </div>
    );
}

export default CompanyDetails;
