import authService from "../../../../../Services/AuthService";
import "./StartPage.css";
import UserModel from "../../../../../Models/UserModel";
import { useState, useEffect } from "react";

function StartPage(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    
    useEffect(() => {
        setUser(authService.parseJwt(sessionStorage.getItem("token")));
    },[]);

    return (
        <div className="StartPage">
            <div>Welcome {user.name}!</div>

            <div>Please choose your action in the menu to the right.</div>
        </div>
    );
}

export default StartPage;
