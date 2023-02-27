import CompanyModel from "../../../../../Models/CompanyModel";
import "./CompanyCard.css";

interface CompanyCardProps {
	company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard">
			<p>ID: {props.company.id}</p>
			<p>Name: {props.company.name}</p>
			<p>Email: {props.company.email}</p>
        </div>
    );
}

export default CompanyCard;
