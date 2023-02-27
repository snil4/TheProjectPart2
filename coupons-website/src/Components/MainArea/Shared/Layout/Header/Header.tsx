import { useNavigate } from "react-router-dom";
import Clock from "./Clock/Clock";
import "./Header.css";

interface HeaderProps {
	name: string;
}

function Header(props: HeaderProps): JSX.Element {
    const navigate = useNavigate();

    function logOut(){
        sessionStorage.removeItem("token");
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
