import { createStore } from "redux";
import ProductModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";

// 1. products state - the data we need at global application level
class CustomersState{
    public customers: CustomerModel[] = [];
}

// 2. Action Types
export enum CustomerActionType{
    FetchCustomers,
    AddCustomers,
    UpdateCustomers,
    DeleteCustomers
}

// 3. Action - an interface describing a single command
export interface CustomerAction{
    type: CustomerActionType; // action type
    payload: any; // action data
}

// 4. action creators - fucntions to create action objects
export function fetchCustomerAction(customers: CustomerModel[]): CustomerAction {
    return {type: CustomerActionType.FetchCustomers, payload: customers};
}

export function addCompanyAction(customer: CustomerModel): CustomerAction {
    return {type: CustomerActionType.AddCustomers, payload: customer};
}

export function updateCompanyAction(customer: CustomerModel): CustomerAction {
    return {type: CustomerActionType.UpdateCustomers, payload: customer};
}

export function deleteCompanyAction(id: number): CustomerAction {
    return {type: CustomerActionType.DeleteCustomers, payload: id};
}

// 5. reducer - a single fuction performing any of the above actions
export function customerReduce(currentState: CustomersState = new CustomersState(), action: CustomerAction): CustomersState {
    const newState = {...currentState};
    switch(action.type){
        case CustomerActionType.FetchCustomers: // here payload is all products
            newState.customers = action.payload;
            break;
        case CustomerActionType.AddCustomers: // here payload is a single product to add
            newState.customers.push(action.payload);
            break;
        case CustomerActionType.UpdateCustomers: // here payload is a single product to update
            const indexToUpdate = newState.customers.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.customers[indexToUpdate] = action.payload;
            }
            break;
        case CustomerActionType.DeleteCustomers: // here payload is an id to delete
            const indexToDelete = newState.customers.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) {
                newState.customers.splice(indexToDelete, 1);
            }
    }
    return newState;
}

// 6. ProductsStore object to manage all products state
export const customersStore = createStore(customerReduce);
