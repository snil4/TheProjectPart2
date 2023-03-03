import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import { companiesStore, CompanyActionType } from "../Redux/CompanyState";
import { CustomerActionType, customersStore } from "../Redux/CustomerState";
import config from "../Utils/Config";
import authService from "./AuthService";

class AdminService {
    // Method for each function on server-side to handle responses from the back-end

    public async getAllCompanies(): Promise<CompanyModel[]> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CompanyModel[]>(config.companiesUrl,{headers: header });
        const companies = response.data;
        companiesStore.dispatch({type: CompanyActionType.GetCompanies, payload: companies});
        return companies;
    }

    public async getOneCompany(id: number): Promise<CompanyModel> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CompanyModel>(`${config.companiesUrl}/${id}`,{headers: header});
        const company = response.data;
        return company;
    }

    public async addCompany(company: CompanyModel){
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.post<CompanyModel>(config.companiesUrl, company, {headers: header});
        const newCompany = response.data;
        companiesStore.dispatch({type: CompanyActionType.AddCompany, payload: newCompany});
        return newCompany;
    }

    public async updateCompany(company: CompanyModel) {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.put<CompanyModel>(config.companiesUrl, company,{headers: header});
        const updatedCompany = response.data;
        companiesStore.dispatch({type: CompanyActionType.UpdateCompany, payload: updatedCompany});
        return updatedCompany;
    }

    public async deleteCompany(id: number){
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const resposne = await axios.delete(`${config.companiesUrl}/${id}`,{headers: header});
        companiesStore.dispatch({type: CompanyActionType.DeleteCompany, payload: id});
        return resposne.data;
    }

    public async getAllCustomers(): Promise<CustomerModel[]> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CustomerModel[]>(config.customersUrl,{headers: header });
        const customers = response.data;
        customersStore.dispatch({type: CustomerActionType.GetCustomers, payload: customers});
        return customers;
    }

    public async getOneCustomer(id: number): Promise<CustomerModel> {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.get<CustomerModel>(`${config.customersUrl}/${id}`,{headers: header});
        return response.data;
    }

    public async addCustomer(customer: CustomerModel){
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.post<CustomerModel>(config.customersUrl,customer, {headers: header});
        const addedCustomer = response.data;
        customersStore.dispatch({type: CustomerActionType.AddCustomer, payload: customer});
        return addedCustomer;
    }

    public async updateCustomer(customer: CustomerModel) {
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.put<CustomerModel>(config.customersUrl,customer,{headers: header});
        const updatedCustomer = response.data;
        customersStore.dispatch({type: CustomerActionType.UpdateCustomer, payload: updatedCustomer});
        return updatedCustomer;
    }

    public async deleteCustomer(id: number){
        if (!authService.checkExpiration()) {
            throw new Error("Token Expired");
        }
        const header = authService.setAuthHeader();
        const response = await axios.delete(`${config.customersUrl}/${id}`,{headers: header});
        customersStore.dispatch({type: CustomerActionType.DeleteCustomer, payload: id});
        return response.data;
    }
}

const adminService = new AdminService();

export default adminService;