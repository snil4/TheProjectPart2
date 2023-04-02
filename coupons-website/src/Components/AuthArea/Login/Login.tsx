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

    const {register, handleSubmit ,formState} = useForm<UserModel>();

    async function send(user: UserModel ) {
        try {
            await authService.login(user);
            navigate("/main/start");
        } catch (error) {
            notificationService.error(error + ", please try again");
        }
    }

    return (
        <div className="Login bg-amber-200 dark:bg-slate-500">
            <NavLink to="/" className="border rounded-md p-3 px-12 no-underline text-gray-100 bg-lime-600 hover:bg-lime-700 border-transparent border-cyan-600">Back to Home Page</NavLink>
            <form className="Form bg-white dark:bg-slate-400" onSubmit={handleSubmit(send)}>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="role">Role: </label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue -500 rounded-lg" {...register("role")}>
                    <option value="ADMIN">Admin</option>
                    <option value="COMPANY">Company</option>
                    <option value="CUSTOMER">Customer</option>
                </select><br/>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email: </label><span className="text-red-600">{formState.errors?.email?.message}</span>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue -500 rounded-lg" type="email" placeholder="Email"{...register("email",{
                    required: {value: true, message: "Please enter an email to login"}
                })}/><br/>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password: </label><span className="text-red-600">{formState.errors?.password?.message}</span>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" placeholder="Password" {...register("password", {
                    required: {value: true, message: "Please enter a password to login"}
                })}/><br/>

                <button className="rounded-lg text-xl bg-amber-500 hover:bg-amber-400">Login</button>
            </form>
        </div>
    );
}

export default Login;
