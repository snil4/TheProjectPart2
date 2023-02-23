import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import CompanyCard from "./CompanyCard/CompanyCard";
import "./CompanyList.css";

function CompanyList(): JSX.Element {

    const [companies, setCompanies] = useState<CompanyModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const companies = await adminService.getAllCompanies();
                setCompanies(companies);
            } catch (error) {
                notificationService.error("Error: Can't get companies: " + error);
            }
        })();
    },[]);

    return (
        <div className="CompanyList">
			{companies.map((c) => <CompanyCard key={c.id} company={c}/>)}
            <NavLink className="Add" to="/company/add">+</NavLink>
        </div>
    );
}

export default CompanyList;
