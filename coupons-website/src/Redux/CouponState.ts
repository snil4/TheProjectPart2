import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

// 1. products state - the data we need at global application level
class CouponState{
    public coupons: CouponModel[] = [];
}

// 2. Action Types
export enum CouponActionType{
    GetCoupons,
    AddCoupon,
    UpdateCoupon,
    DeleteCoupon
}

// 3. Action - an interface describing a single command
export interface CouponAction{
    type: CouponActionType; // action type
    payload: any; // action data
}

// 4. action creators - fucntions to create action objects
export function fetchCouponsAction(coupons: CouponModel[]): CouponAction {
    return {type: CouponActionType.GetCoupons, payload: coupons};
}

export function addCouponAction(coupon: CouponModel): CouponAction {
    return {type: CouponActionType.AddCoupon, payload: coupon};
}

export function updateCouponAction(coupon: CouponModel): CouponAction {
    return {type: CouponActionType.UpdateCoupon, payload: coupon};
}

export function deleteCouponAction(id: number): CouponAction {
    return {type: CouponActionType.DeleteCoupon, payload: id};
}

// 5. reducer - a single fuction performing any of the above actions
export function couponReduce(currentState: CouponState = new CouponState(), action: CouponAction): CouponState {
    const newState = {...currentState};
    switch(action.type){
        case CouponActionType.GetCoupons: // here payload is all products
            newState.coupons = action.payload;
            break;
        case CouponActionType.AddCoupon: // here payload is a single product to add
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.UpdateCoupon: // here payload is a single product to update
            const indexToUpdate = newState.coupons.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.coupons[indexToUpdate] = action.payload;
            }
            break;
        case CouponActionType.DeleteCoupon: // here payload is an id to delete
            const indexToDelete = newState.coupons.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) {
                newState.coupons.splice(indexToDelete, 1);
            }
    }
    return newState;
}

// 6. ProductsStore object to manage all products state
export const couponsStore = createStore(couponReduce);
