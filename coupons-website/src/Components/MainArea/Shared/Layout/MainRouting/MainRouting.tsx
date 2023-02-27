import { Route, Routes } from "react-router-dom";
import PageNotFound from "../../../../SharedArea/PageNotFound/PageNotFound";
import AddCompany from "../../../Admin/CompanyList/AddCompany/AddCompany";
import CompanyList from "../../../Admin/CompanyList/CompanyList";
import AddCustomer from "../../../Admin/CustomerList/AddCustomer/AddCustomer";
import CustomerList from "../../../Admin/CustomerList/CustomerList";
import StartPage from "../../StartPage/StartPage";
import UserInfo from "../../UserInfo/UserInfo";
import "./MainRouting.css";

function MainRouting(): JSX.Element {
    return (
        <div>
            <Routes>
                <Route path="/start" element={<StartPage/>}/>
                <Route path="/admin/company" element={<CompanyList/>}/>
                <Route path="/admin/company/add" element={<AddCompany/>}/>
                <Route path="/admin/customer" element={<CustomerList/>}/>
                <Route path="/admin/customer/add" element={<AddCustomer/>}/>
                <Route path="/info" element={<UserInfo/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default MainRouting;
