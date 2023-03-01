import authService from "../../../../Services/AuthService";
import "./StartPage.css";

function StartPage(): JSX.Element {

    const user = authService.getClient();

    return (        
    <div className="StartPage">
        <div>Welcome {user.name}!</div>

        <div>Please choose your action in the menu to the left.</div>
    </div>
);
}

export default StartPage;
