import { Route, Routes } from "react-router-dom";
import PageNotFound from "../../../../SharedArea/PageNotFound/PageNotFound";
import AddCompany from "../../../Admin/CompanyList/AddCompany/AddCompany";
import CompanyList from "../../../Admin/CompanyList/CompanyList";
import AddCustomer from "../../../Admin/CustomerList/AddCustomer/AddCustomer";
import CustomerList from "../../../Admin/CustomerList/CustomerList";
import AddCoupon from "../../../Company/CouponsList/AddCoupon/AddCoupon";
import CompanyCouponsList from "../../../Company/CouponsList/CouponsList";
import CustomerCouponsList from "../../../Customer/CouponsList/CouponsList";
import PurchaseCoupon from "../../../Customer/CouponsList/PurchaseCoupon/PurchaseCoupon";
import StartPage from "../../StartPage/StartPage";
import UserInfo from "../../UserInfo/UserInfo";
import CustomerDetails from "../../../Admin/CustomerList/CustomerDetails/CustomerDetails";
import CompanyDetails from "../../../Admin/CompanyList/CompanyDetails/CompanyDetails";

function MainRouting(): JSX.Element {
    return (
        <div>
            <Routes>
                {/* Shared paths */}
                <Route path="/start" element={<StartPage/>}/>
                <Route path="/info" element={<UserInfo/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
                {/* Admin paths */}
                <Route path="/admin/company" element={<CompanyList/>}/>
                <Route path="/admin/company/add" element={<AddCompany/>}/>
                <Route path="/admin/company/:companyId" element={<CompanyDetails/>}/>
                <Route path="/admin/company/edit/:companyId" element={<CompanyDetails/>}/>
                <Route path="/admin/customer" element={<CustomerList/>}/>
                <Route path="/admin/customer/add" element={<AddCustomer/>}/>
                <Route path="/admin/customer/:customerId" element={<CustomerDetails/>}/>
                <Route path="/admin/customer/edit/:customerId" element={<CustomerDetails/>}/>
                {/* Company paths */}
                <Route path="/company/coupon" element={<CompanyCouponsList/>}/>
                <Route path="/company/coupon/add" element={<AddCoupon/>}/>
                <Route path="/company/coupon/:couponId" element={<CompanyCouponsList/>}/>
                <Route path="/company/coupon/edit/:couponId" element={<CompanyCouponsList/>}/>
                {/* Customer paths */}
                <Route path="/customer/coupon" element={<CustomerCouponsList/>}/>
                <Route path="/customer/coupon/purchase" element={<PurchaseCoupon/>}/>
            </Routes>
        </div>
    );
}

export default MainRouting;
