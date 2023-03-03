class Config{

}

class DevelopmentConfig{
    public baseUrl=`http://localhost:8080/api/`;
    public secretKey = "aaaaaaaaa1aaaaaaaaa2aaaaaaaaa3aaaaaaaaa4aaaaaaaaa5"
}

class ProductionConfig{
    public baseUrl="http://www.couponswebsite.com/api/";
    public secretKey = "aaaaaaaaa1aaaaaaaaa2aaaaaaaaa3aaaaaaaaa4aaaaaaaaa5"
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig() ;

export default config;