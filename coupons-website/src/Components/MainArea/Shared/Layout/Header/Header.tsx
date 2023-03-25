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
        <div className="Header grid grid-flow-col">
            <button onClick={logOut} className="py-10">Log out</button>
			<span>Hello {props.name}</span>
            <Clock/>
        </div>
    );
}

export default Header;
