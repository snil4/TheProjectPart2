import { useNavigate } from "react-router-dom";
import authService from "../../../../../Services/AuthService";
import Clock from "./Clock/Clock";
import "./Header.css";

interface HeaderProps {
	name: string;
}

function Header(props: HeaderProps): JSX.Element {
    const navigate = useNavigate();

    function logOut(){
        authService.logout();
        navigate("/");
    }

    return (
        <div className="Header">
			Hello {props.name}
            <button onClick={logOut}>Log out</button>
            <Clock/>
        </div>
    );
}

export default Header;
