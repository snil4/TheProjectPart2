import { Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Home from "../../HomeArea/Home/Home";
import Layout from "../../MainArea/Shared/Layout/Layout";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
			<Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/main/*" element={<Layout/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
