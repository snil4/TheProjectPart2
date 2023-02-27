import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import config from "../Utils/Config";
import authService from "./AuthService";

class AdminService {

    public async getAllCompanies(): Promise<CompanyModel[]> {
        const header = authService.setAuthHeader();
        const response = await axios.get<CompanyModel[]>(`${config.baseUrl}admin/company`,{headers: header });
        const companies = response.data;
        return companies;
    }

    public async getOneCompany(id: number): Promise<CompanyModel> {
        const response = await axios.get<CompanyModel>(`${config.baseUrl}admin/company/${id}`,{headers: {Authorization: `bearer ${sessionStorage.getItem("token")}`}});
        const company = response.data;
        return company;
    }

    public async addCompany(company: CompanyModel): Promise<void>{
        const header = authService.setAuthHeader();
        await axios.post<CompanyModel>(`${config.baseUrl}admin/company`,company, {headers: header});
    }

    public async updateCompany(company: CompanyModel) {
        const header = authService.setAuthHeader();
        await axios.put<CompanyModel>(`${config.baseUrl}admin/company`,company,{headers: header});
    }

    public async deleteCompany(id: number){
        const header = authService.setAuthHeader();
        await axios.delete(`${config.baseUrl}admin/company/${id}`,{headers: header});
    }

    public async getAllCustomers(): Promise<CustomerModel[]> {
        const header = authService.setAuthHeader();
        const response = await axios.get<CustomerModel[]>(`${config.baseUrl}admin/customer`,{headers: header });
        const customers = response.data;
        return customers;
    }

    public async getOneCustomer(id: number): Promise<CustomerModel> {
        const header = authService.setAuthHeader();
        const response = await axios.get<CustomerModel>(`${config.baseUrl}admin/customer/${id}`,{headers: header});
        const customer = response.data;
        return customer;
    }

    public async addCustomer(customer: CustomerModel){
        const header = authService.setAuthHeader();
        await axios.post(`${config.baseUrl}admin/customer`,customer, {headers: header});
    }

    public async updateCustomer(customer: CustomerModel) {
        const header = authService.setAuthHeader();
        await axios.put(`${config.baseUrl}admin/customer`,customer,{headers: header});
    }

    public async deleteCustomer(id: number){
        const header = authService.setAuthHeader();
        await axios.delete(`${config.baseUrl}admin/customer/${id}`,{headers: header});
    }
}

const adminService = new AdminService();

export default adminService;