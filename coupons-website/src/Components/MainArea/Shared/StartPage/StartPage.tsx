import authService from "../../../../Services/AuthService";
import "./StartPage.css";
import UserModel from "../../../../Models/UserModel";
import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";

function StartPage(): JSX.Element {

    const user = authService.getClient();

    const element = (
        <div className="StartPage">
            <div>Welcome {user.name}!</div>

            <div>Please choose your action in the menu to the right.</div>
        </div>
    );

    return (<Layout component={element}/>);
}

export default StartPage;
