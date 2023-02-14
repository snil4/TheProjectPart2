import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import PageNotFound from "../../PageNotFound/PageNotFound";
import Layout from "../../LayoutArea/Layout/Layout";
import "./Routing.css";
import MainRouting from "../../LayoutArea/MainRouting/MainRouting";
import authService from "../../../Services/Auth";

interface RoutingProps {
	
}

function AuthRouting(props: RoutingProps): JSX.Element {
    function checkLogin(): boolean {
        return sessionStorage.getItem("token") !== null 
        && authService.checkTokenExpiration(sessionStorage.getItem("token"));
    }

    return (
        <div className="Routing">
			<Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/main/*" element={checkLogin() ? <Layout/> : <Login/>}/>
                <Route path="/" element={checkLogin() ? <Layout/> : <Login/>}/>
                <Route path="/activities/*" element={checkLogin() ? <Layout/> : <Login/>}/>
                <Route path="/coupon/*" element={checkLogin() ? <Layout/> : <Login/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default AuthRouting;
