import { NavLink } from "react-router-dom";
import CustomerModel from "../../../../../Models/CustomerModel";
import "./CustomerCard.css";

interface CustomerCardProps {
	customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
    return (
        <div className="CustomerCard Card">
            <NavLink to={`/main/admin/customer/${props.customer.id}`}>
                <p>ID: {props.customer.id}</p>
                <p>First Name: {props.customer.firstName}</p>
                <p>Last Name: {props.customer.lastName}</p>
                <p>Email: {props.customer.email}</p>
            </NavLink>
        </div>
    );
}

export default CustomerCard;
