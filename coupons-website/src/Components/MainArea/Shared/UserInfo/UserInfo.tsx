import { authStore } from "../../../../Redux/AuthState";
import "./UserInfo.css";

function UserInfo(): JSX.Element {

    const user = authStore.getState().user;

    return (
        <div className="UserInfo">
            <p>Name: {user.name}</p>
            <p className=" text-amber-600">-----</p>
            <p>Email: {user.email}</p>
            <p className=" text-amber-600">-----</p>
            <p>Role: {user.role}</p>
            <p className=" text-amber-600">-----</p>
            <p>ID: {user.sub}</p>
        </div>
    );
}

export default UserInfo;
