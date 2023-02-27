import authService from "../../../../Services/AuthService";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import "./Layout.css";
import MainRouting from "../MainRouting/MainRouting";

interface LayoutProps {
    
}

function Layout(props: LayoutProps): JSX.Element {

    const client = authService.parseJwt(sessionStorage.getItem("token"));

    return (
        <div className="Layout">
			<header><Header name={client.name}/></header>
            <aside><Menu/></aside>
            <main><MainRouting/></main>
            <footer><Footer id={client.sub}/></footer>
        </div>
    );
}

export default Layout;
