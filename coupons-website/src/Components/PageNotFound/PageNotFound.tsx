import "./PageNotFound.css";

interface PageNotFoundProps {
	
}

function PageNotFound(props: PageNotFoundProps): JSX.Element {
    return (
        <div className="PageNotFound">
			Error 404: Page not found.
        </div>
    );
}

export default PageNotFound;
