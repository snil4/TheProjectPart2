import { createStore } from "redux";
import CompanyModel from "../Models/CompanyModel";

// 1. products state - the data we need at global application level
class CompaniesState{
    public companies: CompanyModel[] = [];
}

// 2. Action Types
export enum CompanyActionType{
    GetCompanies,
    AddCompany,
    UpdateCompany,
    DeleteCompany,
    RemoveState
}

// 3. Action - an interface describing a single command
export interface CompanyAction{
    type: CompanyActionType; // action type
    payload: any; // action data
}

// 4. action creators - fucntions to create action objects
export function fetchCompanyAction(companies: CompanyModel[]): CompanyAction {
    return {type: CompanyActionType.GetCompanies, payload: companies};
}

export function addCompanyAction(company: CompanyModel): CompanyAction {
    return {type: CompanyActionType.AddCompany, payload: company};
}

export function updateCompanyAction(company: CompanyModel): CompanyAction {
    return {type: CompanyActionType.UpdateCompany, payload: company};
}

export function deleteCompanyAction(id: number): CompanyAction {
    return {type: CompanyActionType.DeleteCompany, payload: id};
}

export function removeStateAction(): CompanyAction {
    return {type: CompanyActionType.RemoveState, payload: null};
}

// 5. reducer - a single fuction performing any of the above actions
export function companyReduce(currentState: CompaniesState = new CompaniesState(), action: CompanyAction): CompaniesState {
    const newState = {...currentState};
    switch(action.type){
        case CompanyActionType.GetCompanies: // here payload is all products
            newState.companies = action.payload;
            break;
        case CompanyActionType.AddCompany: // here payload is a single product to add
            newState.companies.push(action.payload);
            break;
        case CompanyActionType.UpdateCompany: // here payload is a single product to update
            const indexToUpdate = newState.companies.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.companies[indexToUpdate] = action.payload;
            }
            break;
        case CompanyActionType.DeleteCompany: // here payload is an id to delete
            const indexToDelete = newState.companies.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) {
                newState.companies.splice(indexToDelete, 1);
            }
            break;
        case CompanyActionType.RemoveState:
            return new CompaniesState();
    }
    return newState;
}

// 6. ProductsStore object to manage all products state
export const companiesStore = createStore(companyReduce);
