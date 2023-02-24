import { useEffect, useState } from "react";
import UserModel from "../../../../Models/UserModel";
import authService from "../../../../Services/AuthService";
import Layout from "../Layout/Layout";
import "./UserInfo.css";

interface UserInfoProps {
	
}

function UserInfo(props: UserInfoProps): JSX.Element {

    const user = authService.getClient();

    const element = (
        <div className="UserInfo">
            <p>Name: {user.name}</p>
            <p>Role: {user.role}</p>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
        </div>
    );

    return (<Layout component={element}/>);
}

export default UserInfo;
