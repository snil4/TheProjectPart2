class Config{

}

class DevelopmentConfig{
    public baseUrl = "http://localhost:8080/api/";
    public companiesUrl = this.baseUrl + "admin/company";
    public customersUrl = this.baseUrl + "admin/customer";
    public companyUri = this.baseUrl + "company/";
    public companyCouponsUrl = this.companyUri + "coupon";
    public customerUri = this.baseUrl + "customer/";
    public customerCouponUrl = this.customerUri + "coupon";
    public secretKey = "aaaaaaaaa1aaaaaaaaa2aaaaaaaaa3aaaaaaaaa4aaaaaaaaa5"
    public customerCouponAllUrl = this.customerCouponUrl + "/all"
}

class ProductionConfig{
    public baseUrl = "http://www.couponswebsite.com/api/";
    public companiesUrl = this.baseUrl + "admin/company";
    public customersUrl = this.baseUrl + "admin/customer";
    public companyUri = this.baseUrl + "company/";
    public companyCouponsUrl = this.companyUri + "coupon";
    public customerUri = this.baseUrl + "customer/";
    public customerCouponUrl = this.customerUri + "coupon";
    public secretKey = "aaaaaaaaa1aaaaaaaaa2aaaaaaaaa3aaaaaaaaa4aaaaaaaaa5"
    public customerCouponAllUrl = this.customerCouponUrl + "/all"
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig() ;

export default config;