import authService from "../../../../Services/AuthService";
import "./UserInfo.css";

interface UserInfoProps {
	
}

function UserInfo(props: UserInfoProps): JSX.Element {

    const user = authService.getClient();

    return (
        <div className="UserInfo">
        <p>Name: {user.name}</p>
        <p>Role: {user.role}</p>
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
    </div>
    );
}

export default UserInfo;
