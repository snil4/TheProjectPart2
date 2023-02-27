import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import config from "../Utils/Config";
import authService from "./AuthService";
import crypto from "crypto";

class AdminService {
    // Method for each function on server-side to handle responses from the back-end

    public async getAllCompanies(): Promise<CompanyModel[]> {
        const header = authService.setAuthHeader();
        const response = await axios.get<CompanyModel[]>(`${config.baseUrl}admin/company`,{headers: header });
        return response.data;
    }

    public async getOneCompany(id: number): Promise<CompanyModel> {
        const header = authService.setAuthHeader();
        const response = await axios.get<CompanyModel>(`${config.baseUrl}admin/company/${id}`,{headers: header});
        return response.data;
    }

    public async addCompany(company: CompanyModel){
        const header = authService.setAuthHeader();
        const response = await axios.post<CompanyModel>(`${config.baseUrl}admin/company`,company, {headers: header});
        return response.data;
    }

    public async updateCompany(company: CompanyModel) {
        const header = authService.setAuthHeader();
        const response = await axios.put<CompanyModel>(`${config.baseUrl}admin/company`,company,{headers: header});
        return response.data;
    }

    public async deleteCompany(id: number){
        const header = authService.setAuthHeader();
        const resposne = await axios.delete(`${config.baseUrl}admin/company/${id}`,{headers: header});
        return resposne.data;
    }

    public async getAllCustomers(): Promise<CustomerModel[]> {
        const header = authService.setAuthHeader();
        const response = await axios.get<CustomerModel[]>(`${config.baseUrl}admin/customer`,{headers: header });
        return response.data;
    }

    public async getOneCustomer(id: number): Promise<CustomerModel> {
        const header = authService.setAuthHeader();
        const response = await axios.get<CustomerModel>(`${config.baseUrl}admin/customer/${id}`,{headers: header});
        return response.data;
    }

    public async addCustomer(customer: CustomerModel){
        const header = authService.setAuthHeader();
        const response = await axios.post(`${config.baseUrl}admin/customer`,customer, {headers: header});
        return response.data;
    }

    public async updateCustomer(customer: CustomerModel) {
        const header = authService.setAuthHeader();
        const response = await axios.put(`${config.baseUrl}admin/customer`,customer,{headers: header});
        return response.data;
    }

    public async deleteCustomer(id: number){
        const header = authService.setAuthHeader();
        const response = await axios.delete(`${config.baseUrl}admin/customer/${id}`,{headers: header});
        return response.data;
    }
}

const adminService = new AdminService();

export default adminService;