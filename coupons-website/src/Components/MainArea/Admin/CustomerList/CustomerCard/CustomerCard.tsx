import CustomerModel from "../../../../../Models/CustomerModel";
import "./CustomerCard.css";

interface CustomerCardProps {
	customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
    return (
        <div className="CustomerCard">
			{props.customer.firstName} {props.customer.lastName}
        </div>
    );
}

export default CustomerCard;
