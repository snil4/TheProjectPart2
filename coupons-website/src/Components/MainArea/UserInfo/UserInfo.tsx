import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/Auth";
import "./UserInfo.css";

interface UserInfoProps {
	
}

function UserInfo(props: UserInfoProps): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    
    useEffect(() => {
        setUser(authService.parseJwt(sessionStorage.getItem("token")));
    },[])

    return (
        <div className="UserInfo">
            
        </div>
    );
}

export default UserInfo;
