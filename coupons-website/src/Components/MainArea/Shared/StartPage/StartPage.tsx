import { useEffect, useState } from "react";
import { authStore } from "../../../../Redux/AuthState";
import authService from "../../../../Services/AuthService";
import "./StartPage.css";

function StartPage(): JSX.Element {

    const name = authStore.getState().user.name;

    return (        
    <div className="StartPage text-4xl p-3">
        <div>Welcome {name}!</div>
        <div>Please choose your action in the menu to the left.</div>
    </div>
);
}

export default StartPage;
