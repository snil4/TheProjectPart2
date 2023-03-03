import { createStore } from "redux";
import UserModel from "../Models/UserModel";

// 1. products state - the data we need at global application level
class AuthState{
    public user: UserModel = null;
}

// 2. Action Types
export enum AuthActionType{
    Login,
    Logout
}

// 3. Action - an interface describing a single command
export interface AuthAction{
    type: AuthActionType; // action type
    payload: any; // action data
}

// 4. action creators - fucntions to create action objects
export function Login(user: UserModel): AuthAction {
    return {type: AuthActionType.Login, payload: user};
}

export function Logout(user: UserModel): AuthAction {
    return {type: AuthActionType.Logout, payload: null};
}

// 5. reducer - a single fuction performing any of the above actions
export function authReduce(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = {...currentState};
    switch(action.type){
        case AuthActionType.Login:
            newState.user = action.payload;
            break;
        case AuthActionType.Logout:
            break;
    }
    return newState;
}

// 6. ProductsStore object to manage all products state
export const authStore = createStore(authReduce);
