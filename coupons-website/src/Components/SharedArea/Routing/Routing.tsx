import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import Login from "../../AuthArea/Login/Login";
import Home from "../../HomeArea/Home/Home";
import Layout from "../../MainArea/Shared/Layout/Layout";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
			<Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/main/*" element={<Layout/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
