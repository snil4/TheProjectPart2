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
            <button onClick={logOut} className="border border-solid bg-emerald-600 text-blue-700 hover:text-purple-600">Log out</button>
			<span className="">Hello {props.name}</span>
            <Clock/>
        </div>
    );
}

export default Header;
