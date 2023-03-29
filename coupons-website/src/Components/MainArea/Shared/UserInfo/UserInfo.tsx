import { authStore } from "../../../../Redux/AuthState";
import "./UserInfo.css";

function UserInfo(): JSX.Element {

    const user = authStore.getState().user;

    return (
        <div className="UserInfo [&>span]:text-amber-700">
            <p>Name: {user.name}</p>
            <span>------</span>
            <p>Email: {user.email}</p>
            <span>------</span>
            <p>Role: {user.role}</p>
            <span>------</span>
            <p>ID: {user.sub}</p>
        </div>
    );
}

export default UserInfo;
