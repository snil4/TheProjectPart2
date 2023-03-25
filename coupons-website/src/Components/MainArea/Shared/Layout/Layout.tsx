import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import "./Layout.css";
import MainRouting from "./MainRouting/MainRouting";
import { authStore } from "../../../../Redux/AuthState";

interface LayoutProps {
    
}

function Layout(props: LayoutProps): JSX.Element {

    const client = authStore.getState().user;

    return (
        <div className="Layout bg-teal-300 dark:bg-amber-400">
			<header><Header name={client.name}/></header>
            <aside><Menu/></aside>
            <main><MainRouting/></main>
            <footer><Footer id={client.sub}/></footer>
        </div>
    );
}

export default Layout;
