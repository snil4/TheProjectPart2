import Layout from "../../Shared/Layout/Layout";
import "./CouponsList.css";

interface CouponsListProps {
	
}

function CouponsList(props: CouponsListProps): JSX.Element {
    const element = (
        <div className="CouponsList">
			Coupons
        </div>
    );

    return (<Layout component={element}/>);
}

export default CouponsList;
