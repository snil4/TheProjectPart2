package com.yiftach.TheProjectPart2.app.core.repositories;

import com.yiftach.TheProjectPart2.app.core.data.Category;
import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CouponRepo extends JpaRepository<Coupon,Integer>{

    List<Coupon> findByCompanyId(int CompanyId);

    List<Coupon> findByCategory(Category category);

    @Query(value = "select * from coupon where price <= :maxprice",nativeQuery = true)
    List<Coupon> findByMaxPrice(@Param("maxprice") int maxPrice);

}
