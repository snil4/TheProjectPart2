import { useEffect, useState } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyCard from "./CompanyCard/CompanyCard";
import "./CompanyList.css";

function CompanyList(): JSX.Element {

    const list: CompanyModel[] = [];

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
    },[])

    return (
        <div className="CompanyList">
			{companies.map((c) => <CompanyCard company={c}/>)}
        </div>
    );
}

export default CompanyList;
