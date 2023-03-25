import { authStore } from "../../../../Redux/AuthState";
import "./StartPage.css";

function StartPage(): JSX.Element {

    const user = authStore.getState().user;

    return (        
    <div className="StartPage text-4xl p-3">
        <div>Welcome {user.name}!</div>

        <div>Please choose your action in the menu to the left.</div>
    </div>
);
}

export default StartPage;
