import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import authService from "../../../../Services/AuthService";
import notificationService from "../../../../Services/NotificationService";
import CompanyCard from "./CompanyCard/CompanyCard";
import "./CompanyList.css";

function CompanyList(): JSX.Element {

    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const navigate = useNavigate();

    function returnToLogin() {
        notificationService.error("Token expired, please login again");
        authService.logout();
        navigate("/login");
    }

    useEffect(() => {
        // if ((!authService.checkExpiration()) || authService.getClient().role !== "admin") {
        //     returnToLogin();
        // }
        (async () => {
            try {
                const list = await adminService.getAllCompanies();
                setCompanies(list);
            } catch (error: any) {
                if (error.message === "Token Expired") {
                    returnToLogin();
                }
                notificationService.error("Error: Can't get companies: " + error);
            }
        })();
    },[]);

    return (
        <div className="CompanyList List" id="company-list-top">
            {companies.map((c) => <CompanyCard key={c.id} company={c}/>)}
            <NavLink className="AddButton" to="/main/admin/company/add">+</NavLink>
            <a href="#company-list-top">top</a>
</div>);
}

export default CompanyList;
