import "./Footer.css";

interface FooterProps {
	id: string;
}

function Footer(props: FooterProps): JSX.Element {
    return (
        <div className="Footer">
			ID: {props.id}
        </div>
    );
}

export default Footer;
