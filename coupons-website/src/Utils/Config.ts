class Config{

}

class DevelopmentConfig{
    public baseUrl="http://localhost:8080/api/";
}

class ProductionConfig{
    public baseUrl="http://www.couponswebsite.com/api/";
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig() ;

export default config;