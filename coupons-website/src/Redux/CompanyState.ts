import { createStore } from "redux";
import CompanyModel from "../Models/CompanyModel";
import ProductModel from "../Models/CompanyModel";

// 1. products state - the data we need at global application level
class CompaniesState{
    public companies: CompanyModel[] = [];
}

// 2. Action Types
export enum CompanyActionType{
    FetchCompanies,
    AddCompanies,
    UpdateCompanies,
    DeleteCompanies
}

// 3. Action - an interface describing a single command
export interface CompanyAction{
    type: CompanyActionType; // action type
    payload: any; // action data
}

// 4. action creators - fucntions to create action objects
export function fetchCompanyAction(companies: CompanyModel[]): CompanyAction {
    return {type: CompanyActionType.FetchCompanies, payload: companies};
}

export function addCompanyAction(company: CompanyModel): CompanyAction {
    return {type: CompanyActionType.AddCompanies, payload: company};
}

export function updateCompanyAction(company: CompanyModel): CompanyAction {
    return {type: CompanyActionType.UpdateCompanies, payload: company};
}

export function deleteCompanyAction(id: number): CompanyAction {
    return {type: CompanyActionType.DeleteCompanies, payload: id};
}

// 5. reducer - a single fuction performing any of the above actions
export function companyReduce(currentState: CompaniesState = new CompaniesState(), action: CompanyAction): CompaniesState {
    const newState = {...currentState};
    switch(action.type){
        case CompanyActionType.FetchCompanies: // here payload is all products
            newState.companies = action.payload;
            break;
        case CompanyActionType.AddCompanies: // here payload is a single product to add
            newState.companies.push(action.payload);
            break;
        case CompanyActionType.UpdateCompanies: // here payload is a single product to update
            const indexToUpdate = newState.companies.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.companies[indexToUpdate] = action.payload;
            }
            break;
        case CompanyActionType.DeleteCompanies: // here payload is an id to delete
            const indexToDelete = newState.companies.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) {
                newState.companies.splice(indexToDelete, 1);
            }
    }
    return newState;
}

// 6. ProductsStore object to manage all products state
export const companiesStore = createStore(companyReduce);
