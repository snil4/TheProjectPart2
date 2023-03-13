import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import { companiesStore, CompanyActionType } from "../Redux/CompanyState";
import { CustomerActionType, customersStore } from "../Redux/CustomerState";
import config from "../Utils/Config";

class AdminService {
    // Method for each function on server-side to handle responses from the back-end

    public async getAllCompanies(): Promise<CompanyModel[]> {
        if (companiesStore.getState().companies.length === 0) {
            const response = await axios.get<CompanyModel[]>(config.companiesUrl);
            const companies = response.data;
            companiesStore.dispatch({type: CompanyActionType.GetCompanies, payload: companies});
        }
        return companiesStore.getState().companies;
    }

    public async getOneCompany(id: number): Promise<CompanyModel> {
        const response = await axios.get<CompanyModel>(`${config.companiesUrl}/${id}`);
        const company = response.data;
        return company;
    }

    public async addCompany(company: CompanyModel){
        const response = await axios.post<CompanyModel>(config.companiesUrl, company);
        const newCompany = response.data;
        companiesStore.dispatch({type: CompanyActionType.AddCompany, payload: newCompany});
        return newCompany;
    }

    public async updateCompany(company: CompanyModel) {
        const response = await axios.put<CompanyModel>(config.companiesUrl, company);
        const updatedCompany = response.data;
        companiesStore.dispatch({type: CompanyActionType.UpdateCompany, payload: updatedCompany});
        return updatedCompany;
    }

    public async deleteCompany(id: number){
        const resposne = await axios.delete(`${config.companiesUrl}/${id}`);
        companiesStore.dispatch({type: CompanyActionType.DeleteCompany, payload: id});
        return resposne.data;
    }

    public async getAllCustomers(): Promise<CustomerModel[]> {
        if (customersStore.getState().customers.length === 0) {
            const response = await axios.get<CustomerModel[]>(config.customersUrl);
            const customers = response.data;
            customersStore.dispatch({type: CustomerActionType.GetCustomers, payload: customers});
        }
        return customersStore.getState().customers;
    }

    public async getOneCustomer(id: number): Promise<CustomerModel> {
        const response = await axios.get<CustomerModel>(`${config.customersUrl}/${id}`);
        return response.data;
    }

    public async addCustomer(customer: CustomerModel){
        const response = await axios.post<CustomerModel>(config.customersUrl,customer);
        const addedCustomer = response.data;
        customersStore.dispatch({type: CustomerActionType.AddCustomer, payload: addedCustomer});
        return addedCustomer;
    }

    public async updateCustomer(customer: CustomerModel) {
        const response = await axios.put<CustomerModel>(config.customersUrl,customer);
        const updatedCustomer = response.data;
        customersStore.dispatch({type: CustomerActionType.UpdateCustomer, payload: updatedCustomer});
        return updatedCustomer;
    }

    public async deleteCustomer(id: number){
        const response = await axios.delete(`${config.customersUrl}/${id}`);
        customersStore.dispatch({type: CustomerActionType.DeleteCustomer, payload: id});
        return response.data;
    }
}

const adminService = new AdminService();

export default adminService;