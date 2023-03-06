import CompanyModel from "./CompanyModel";
import CustomerModel from "./CustomerModel";

class CouponModel{
    public id: number;
    public company: CompanyModel;
    public category: Category;
    public title: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public image: File | FileList | string;
    public customers: CustomerModel[];
}

export enum Category{
    SPORT, CLOTHING, ELECTRICITY, CAMPING
}

export default CouponModel;