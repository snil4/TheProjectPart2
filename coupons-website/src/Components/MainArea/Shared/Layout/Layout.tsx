import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import "./Layout.css";
import MainRouting from "./MainRouting/MainRouting";
import { redirect, useNavigate } from "react-router-dom";
import authService from "../../../../Services/AuthService";
import UserModel from "../../../../Models/UserModel";
import { useState, useEffect } from "react";
import { authStore } from "../../../../Redux/AuthState";
import notificationService from "../../../../Services/NotificationService";

interface LayoutProps {
    
}

function Layout(props: LayoutProps): JSX.Element {

    const [client, setClient] = useState<UserModel>();
    const navigate = useNavigate();

    function Logout(){
        notificationService.error("Error: token expired, please login again");
        useEffect(() => {
            authService.logout();
            navigate("/");
        },[])
    }

    if (client) {return (
        <div className="Layout bg-amber-300 dark:bg-amber-400">
			<header><Header name={client.name}/></header>
            <aside><Menu/></aside>
            <main><MainRouting/></main>
            <footer><Footer id={client.sub}/></footer>
        </div>
    )} else {
        const newClient = authService.parseJWT();
        if (newClient) {
            setClient(newClient);
        } else {
            Logout();
        }
    }
}

export default Layout;
