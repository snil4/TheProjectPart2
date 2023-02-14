import { Route, Routes } from "react-router-dom";
import CouponsList from "../../MainArea/CouponsList/CouponsList";
import ManagmentActivities from "../../MainArea/ManagmentActivities/ManagmentActivities";
import StartPage from "../../MainArea/StartPage/StartPage";
import "./MainRouting.css";

interface MainRoutingProps {
	
}

function MainRouting(props: MainRoutingProps): JSX.Element {
    return (
        <div className="MainRouting">
			<Routes>
                <Route path="/main/*" element={<StartPage/>}/>
                <Route path="/activities/*" element={<ManagmentActivities/>}/>
                <Route path="/coupon/*" element={<CouponsList/>}/>
                <Route path="/*" element={<></>}/>
            </Routes>
        </div>
    );
}

export default MainRouting;
