package com.yiftach.TheProjectPart2.app.core.repositories;

import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CouponRepo extends JpaRepository<Coupon,Integer>{

    List<Coupon> findAllByCompanyId(int CompanyId);

}
