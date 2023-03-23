import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import UserModel from "../../../Models/UserModel";
import notificationService from "../../../Services/NotificationService";

interface LoginProps {

}

function Login(props: LoginProps): JSX.Element {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<UserModel>();

    async function send(user: UserModel ) {
        try {
            await authService.login(user);
            navigate("/main/start");
        } catch (error) {
            notificationService.error(error + ", please try again");
        }
    }

    return (
        <div className="Login">
            <NavLink to="/">Back to Home Page</NavLink>
            <form className="Form" onSubmit={handleSubmit(send)}>
                <label htmlFor="role">Role: </label>
                <select {...register("role")}>
                    <option value="ADMIN">Admin</option>
                    <option value="COMPANY">Company</option>
                    <option value="CUSTOMER">Customer</option>
                </select><br/>
                <label htmlFor="email">Email: </label>
                <input type="email" placeholder="Email"{...register("email")}/><br/>
                <label htmlFor="password">Password: </label>
                <input type="password" placeholder="Password" {...register("password")}/><br/>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
