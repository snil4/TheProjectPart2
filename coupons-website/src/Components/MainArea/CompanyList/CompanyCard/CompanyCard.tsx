import CompanyModel from "../../../../Models/CompanyModel";
import "./CompanyCard.css";

interface CompanyCardProps {
	company: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard">
			{props.company.name}
        </div>
    );
}

export default CompanyCard;
