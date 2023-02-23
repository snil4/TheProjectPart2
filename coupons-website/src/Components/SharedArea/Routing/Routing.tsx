import { Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import authService from "../../../Services/AuthService";
import StartPage from "../../MainArea/StartPage/Layout/Layout";
import ManagmentActivities from "../../MainArea/ManagmentActivities/Layout/Layout";
import CouponsList from "../../MainArea/CouponsList/Layout/Layout";
import UserInfo from "../../MainArea/UserInfo/Layout/Layout";
import Home from "../../HomeArea/Home/Layout";
import CompanyList from "../../MainArea/Admin/CompanyList/Layout/Layout";
import AddCompany from "../../MainArea/Admin/CompanyList/AddCompany/Layout/Layout";
import CustomerList from "../../MainArea/Admin/CustomerList/Layout/Layout";

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
                <Route path="/company" element={<CompanyList/>}/>
                <Route path="/customer" element={<CustomerList/>}/>
                <Route path="/coupon" element={<CouponsList/>}/>
                <Route path="/info" element={<UserInfo/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
                <Route path="/company/add" element={<AddCompany/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
