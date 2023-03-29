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
        <div className="Header bg-amber-400">
            <button onClick={logOut} className="border border-solid bg-lime-600 text-blue-600 hover:text-purple-600 hover:bg-lime-700 rounded-md shadow-md mx-5">Log out</button>
			<span className="">Hello {props.name}</span>
            <Clock/>
        </div>
    );
}

export default Header;
