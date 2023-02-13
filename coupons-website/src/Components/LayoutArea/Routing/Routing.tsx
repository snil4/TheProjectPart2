import { Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import PageNotFound from "../../PageNotFound/PageNotFound";
import Layout from "../Layout/Layout";
import "./Routing.css";

interface RoutingProps {
	
}

function Routing(props: RoutingProps): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/main" element={<Layout/>}/>
                <Route path="/" element={sessionStorage.getItem("token") !== null ? <Layout/> : <Login/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
