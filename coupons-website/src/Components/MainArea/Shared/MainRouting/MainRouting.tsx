import { Route, Routes } from "react-router-dom";
import PageNotFound from "../../../SharedArea/PageNotFound/PageNotFound";
import AddCompany from "../../Admin/CompanyList/AddCompany/AddCompany";
import CompanyList from "../../Admin/CompanyList/CompanyList";
import StartPage from "../StartPage/StartPage";
import "./MainRouting.css";

function MainRouting(): JSX.Element {
    return (
        <div>
            <Routes>
                <Route path="/start" element={<StartPage/>}/>
                <Route path="/admin/company" element={<CompanyList/>}/>
                <Route path="/admin/company/add" element={<AddCompany/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default MainRouting;
