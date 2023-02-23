import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";

// 1. products state - the data we need at global application level
class CouponState{
    public coupons: CouponModel[] = [];
}

// 2. Action Types
export enum CouponActionType{
    FetchCoupons,
    AddCoupons,
    UpdateCoupons,
    DeleteCoupons
}

// 3. Action - an interface describing a single command
export interface CouponAction{
    type: CouponActionType; // action type
    payload: any; // action data
}

// 4. action creators - fucntions to create action objects
export function fetchCouponsAction(coupons: CouponModel[]): CouponAction {
    return {type: CouponActionType.FetchCoupons, payload: coupons};
}

export function addCouponAction(coupon: CouponModel): CouponAction {
    return {type: CouponActionType.AddCoupons, payload: coupon};
}

export function updateCouponAction(coupon: CouponModel): CouponAction {
    return {type: CouponActionType.UpdateCoupons, payload: coupon};
}

export function deleteCouponAction(id: number): CouponAction {
    return {type: CouponActionType.DeleteCoupons, payload: id};
}

// 5. reducer - a single fuction performing any of the above actions
export function couponReduce(currentState: CouponState = new CouponState(), action: CouponAction): CouponState {
    const newState = {...currentState};
    switch(action.type){
        case CouponActionType.FetchCoupons: // here payload is all products
            newState.coupons = action.payload;
            break;
        case CouponActionType.AddCoupons: // here payload is a single product to add
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.UpdateCoupons: // here payload is a single product to update
            const indexToUpdate = newState.coupons.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.coupons[indexToUpdate] = action.payload;
            }
            break;
        case CouponActionType.DeleteCoupons: // here payload is an id to delete
            const indexToDelete = newState.coupons.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) {
                newState.coupons.splice(indexToDelete, 1);
            }
    }
    return newState;
}

// 6. ProductsStore object to manage all products state
export const couponsStore = createStore(couponReduce);
