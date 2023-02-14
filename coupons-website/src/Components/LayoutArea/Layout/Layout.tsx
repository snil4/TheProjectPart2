import authService from "../../../Services/Auth";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MainRouting from "../MainRouting/MainRouting";
import Menu from "../Menu/Menu";
import "./Layout.css";

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
