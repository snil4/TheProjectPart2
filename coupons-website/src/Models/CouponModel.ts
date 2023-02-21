import CompanyModel from "./CompanyModel";
import CustomerModel from "./CustomerModel";

class CouponModel{
    public id: number;
    public company: CompanyModel;
    public category: string;
    public title: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public image: string;
    public customers: CustomerModel[];
}

export default CouponModel;