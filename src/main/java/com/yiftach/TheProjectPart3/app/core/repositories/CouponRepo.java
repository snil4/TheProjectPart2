package com.yiftach.TheProjectPart3.app.core.repositories;

import com.yiftach.TheProjectPart3.app.core.data.Category;
import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CouponRepo extends JpaRepository<Coupon,Integer>{

    List<Coupon> findByCompanyId(int CompanyId);

    Optional<Coupon> findByIdAndCompanyId(int Id,int CompanyId);

    List<Coupon> findByCategory(Category category);

    List<Coupon> findByCategoryAndCompanyId(Category category,int companyId);

    List<Coupon> findByPriceLessThanEqual(double maxPrice);

    List<Coupon> findByPriceLessThanEqualAndCompanyId(double maxPrice,int companyId);

    List<Coupon> findByCategoryAndPriceLessThanEqualAndCompanyId(Category category, double maxPrice,int companyId);

    @Query(value = "SELECT * FROM coupon WHERE price <= ?1 AND id IN (SELECT coupon_id FROM customers_vs_coupons WHERE customer_id = ?2)",nativeQuery = true)
    List<Coupon> findByMaxPriceAndCustomerId(double maxPrice,int customerId);

    List<Coupon> findByEndDateBefore(LocalDate endDate);

    long deleteByEndDateBefore(LocalDate endDate);

    void deleteByCompanyId(int companyId);

    boolean existsByTitle(String title);

    @Query(value = "SELECT * FROM customers_vs_coupons WHERE coupon_id = ?1 AND customer_id = ?2",nativeQuery = true)
    Optional<Customer> findByIdInCustomer(int couponId, int customerId);

    @Query(value = "SELECT * FROM coupon WHERE category = ?1 AND id IN (SELECT coupon_id FROM customers_vs_coupons WHERE customer_id = ?2)",nativeQuery = true)
    List<Coupon> findByCategoryAndCustomerId(String category,int customerId);

    @Query(value = "SELECT * FROM coupon WHERE category = ?1 AND price < ?2 id IN (SELECT coupon_id FROM customers_vs_coupons WHERE customer_id = ?3)",nativeQuery = true)
    List<Coupon> findByCategoryAndMaxPriceAndCustomerId(String category,double maxPrice, int customerId);
}
