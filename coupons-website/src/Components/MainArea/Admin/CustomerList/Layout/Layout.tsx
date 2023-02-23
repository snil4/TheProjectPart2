import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../../../Services/AuthService";
import Footer from "../../../Layout/Footer/Footer";
import Header from "../../../Layout/Header/Header";
import Menu from "../../../Layout/Menu/Menu";
import "../../Layout/Layout.css";
import CustomerList from "../CustomerList";

interface LayoutProps {
    
}

function Layout(props: LayoutProps): JSX.Element {

    const navigate = useNavigate();
    const client = authService.parseJwt(sessionStorage.getItem("token"));

    return (
        <div className="Layout">
			<header><Header name={client.name}/></header>
            <aside><Menu/></aside>
            <main><CustomerList/></main>
            <footer><Footer id={client.sub}/></footer>
        </div>
    );
}

export default Layout;
