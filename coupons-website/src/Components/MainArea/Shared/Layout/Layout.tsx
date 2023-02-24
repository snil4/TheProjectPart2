import { useNavigate } from "react-router-dom";
import authService from "../../../../Services/AuthService";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import "./Layout.css";

interface LayoutProps {
    component: JSX.Element;
}

function Layout(props: LayoutProps): JSX.Element {

    const navigate = useNavigate();
    const client = authService.parseJwt(sessionStorage.getItem("token"));

    return (
        <div className="Layout">
			<header><Header name={client.name}/></header>
            <aside><Menu/></aside>
            <main>{props.component}</main>
            <footer><Footer id={client.sub}/></footer>
        </div>
    );
}

export default Layout;
