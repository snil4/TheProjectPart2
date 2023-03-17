import { authStore } from "../../../../Redux/AuthState";
import "./UserInfo.css";

interface UserInfoProps {
	
}

function UserInfo(props: UserInfoProps): JSX.Element {

    const user = authStore.getState().user;

    return (
        <div className="UserInfo">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>ID: {user.sub}</p>
    </div>
    );
}

export default UserInfo;
