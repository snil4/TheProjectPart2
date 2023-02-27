import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import UserModel from "../../../Models/UserModel";

interface LoginProps {

}

function Login(props: LoginProps): JSX.Element {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<UserModel>();

    async function send(user: UserModel ) {
        try {
            const key = await authService.login(user);
            if (key === "") {
                throw new Error("Email or password are incorrect");
            }
            sessionStorage.setItem("token", key);
            navigate("/main/start");
        } catch (error) {
            alert(error + ", please try again");
        }
    }

    return (
        <div className="Login">
            <NavLink to="/">Back to Home Page</NavLink>
            <form className="Form" onSubmit={handleSubmit(send)}>
                <label htmlFor="role">Role: </label>
                <select {...register("role")}>
                    <option value="admin">Admin</option>
                    <option value="company">Company</option>
                    <option value="customer">Customer</option>
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
