import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../../../../Services/AuthService";
import Footer from "../../../../Shared/Layout/Footer/Footer";
import Header from "../../../../Shared/Layout/Header/Header";
import Menu from "../../../../Shared/Layout/Menu/Menu";
import "../../Layout/Layout.css";
import AddCustomer from "../AddCustomer";

interface LayoutProps {
    
}

function Layout(props: LayoutProps): JSX.Element {

    const navigate = useNavigate();
    const client = authService.parseJwt(sessionStorage.getItem("token"));

    return (
        <div className="Layout">
			<header><Header name={client.name}/></header>
            <aside><Menu/></aside>
            <main><AddCustomer/></main>
            <footer><Footer id={client.sub}/></footer>
        </div>
    );
}

export default Layout;
