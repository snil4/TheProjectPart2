import { useNavigate } from "react-router-dom";
import { StringLiteral } from "typescript";
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
            <a onClick={logOut}>Log out</a>
            <Clock/>
        </div>
    );
}

export default Header;
