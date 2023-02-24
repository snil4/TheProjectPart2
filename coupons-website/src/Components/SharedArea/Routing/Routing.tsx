import { Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import authService from "../../../Services/AuthService";
import StartPage from "../../MainArea/Shared/StartPage/StartPage";
import CompanyCouponsList from "../../MainArea/Company/CouponsList/CouponsList";
import UserInfo from "../../MainArea/Shared/UserInfo/UserInfo";
import Home from "../../HomeArea/Home/Home";
import CompanyList from "../../MainArea/Admin/CompanyList/CompanyList";
import AddCompany from "../../MainArea/Admin/CompanyList/AddCompany/AddCompany";
import CustomerList from "../../MainArea/Admin/CustomerList/CustomerList";

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
                <Route path="/admin/company" element={<CompanyList/>}/>
                <Route path="/admin/customer" element={<CustomerList/>}/>
                <Route path="/company/coupon" element={<CompanyCouponsList/>}/>
                <Route path="/info" element={<UserInfo/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
                <Route path="/company/add" element={<AddCompany/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
