import { useNavigate } from "react-router-dom";
import authService from "../../../../Services/AuthService";
import Footer from "../../Layout/Footer/Footer";
import Header from "../../Layout/Header/Header";
import Menu from "../../Layout/Menu/Menu";
import StartPage from "../StartPage/StartPage";
import "../../Layout/Layout.css";

function Layout(): JSX.Element {

    const navigate = useNavigate();
    const client = authService.parseJwt(sessionStorage.getItem("token"));

    return (
        <div className="Layout">
			<header><Header name={client.name}/></header>
            <aside><Menu/></aside>
            <main><StartPage/></main>
            <footer><Footer id={client.sub}/></footer>
        </div>
    );
}

export default Layout;
