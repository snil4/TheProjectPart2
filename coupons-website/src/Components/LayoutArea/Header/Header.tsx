import { StringLiteral } from "typescript";
import "./Header.css";

interface HeaderProps {
	name: string;
}

function Header(props: HeaderProps): JSX.Element {
    return (
        <div className="Header">
			Hello {props.name}
        </div>
    );
}

export default Header;
