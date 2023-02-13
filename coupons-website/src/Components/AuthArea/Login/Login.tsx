import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import authService from "../../../Services/Auth";
import UserModel from "../../../Models/UserModel";

interface LoginProps {

}

function Login(props: LoginProps): JSX.Element {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<UserModel>();

    const send = (user: UserModel ) => {
    authService.login(user.role, user.email, user.password)
    .then(key=>{
        if (key !== "failed") {
            sessionStorage.setItem("token", key);
            const client = authService.parseJwt(key);
            if (client.email == user.email) {
                navigate("/main");
            } else {
                alert("Login failed: please try again later.")
            }
        } else {
            alert("Login failed: please check that your email and password are correct.")
        }
    })
    .catch(err => alert(err.message + ", please try again later."))
    }

    return (
        <div className="Login">
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
