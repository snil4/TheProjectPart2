import { Route, Routes } from "react-router-dom";
import Login from "../AuthArea/Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import authService from "../../Services/AuthService";
import StartPage from "../MainArea/StartPage/Layout/Layout";
import ManagmentActivities from "../MainArea/ManagmentActivities/Layout/Layout";
import CouponsList from "../MainArea/CouponsList/Layout/Layout";
import UserInfo from "../MainArea/UserInfo/Layout/Layout";
import Home from "../HomeArea/Home/Layout";

interface RoutingProps {
	
}

function Routing(props: RoutingProps): JSX.Element {
    function checkLogin(): boolean {
        return sessionStorage.getItem("token") !== null 
        && authService.checkTokenExpiration(sessionStorage.getItem("token"));
    }

    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/main" element={<StartPage/>}/>
                <Route path="/activities" element={<ManagmentActivities/>}/>
                <Route path="/coupon" element={<CouponsList/>}/>
                <Route path="/info" element={<UserInfo/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
