import React, { useState } from "react";
import "./Login.css";



interface LoginProps {

}



function Login(props: LoginProps): JSX.Element {
    const [emailVal, setEmail] = useState("");
    const [passVal, setPass] = useState("");
    const [roleVal, setRole] = useState("ADMIN");

    // function handleLogin(){
    //     const url = "http://localhost:8080/api/" + roleVal.toLowerCase + "/login";
    
    //     const res = fetch(url, {
    //         method: "GET",
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({email: emailVal,password: passVal})
    //     }).then((response) => response.json())
    //     .then((data) => console.log(data));
    
    //     // sessionStorage.setItem("aaaaaaaaa1aaaaaaaaa2aaaaaaaaa3aaaaaaaaa4aaaaaaaaaaaaaaaaaa", res)
    // }

    return (
        <form className="Login">
            <label htmlFor="email">Email: </label>
            <input type="email" placeholder="Email" value={emailVal} onChange={event => setEmail(event.target.value)}/>
            <label htmlFor="password">Password: </label>
            <input type="password" placeholder="Password" value={passVal} onChange={event => setPass(event.target.value)}/><br/>
            <label htmlFor="role">Role: </label>
            <select value={roleVal} onChange={event => setRole(event.target.value)}>
                <option value="ADMIN">Admin</option>
                <option value="COMPANY">Company</option>
                <option value="CUSTOMER">Customer</option>
            </select>
            <button type="submit">Login</button>
        </form>
    );
}



export default Login;
