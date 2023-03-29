import { NavLink } from "react-router-dom";
import CompanyModel from "../../../../../Models/CompanyModel";
import "./CompanyCard.css";

interface CompanyCardProps {
	company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard Card bg-violet-200 shadow-lg">
            <NavLink to={`/main/admin/company/${props.company.id}`}>
                <p>ID: {props.company.id}</p>
                <p>Name: {props.company.name}</p>
                <p>Email: {props.company.email}</p>
            </NavLink>
        </div>
    );
}

export default CompanyCard;
