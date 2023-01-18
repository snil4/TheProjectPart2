package com.yiftach.TheProjectPart2.app.core.tasks;

import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import com.yiftach.TheProjectPart2.app.core.repositories.CouponRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.concurrent.TimeUnit;

@Component
public class CouponExpirationDailyJob {

    private final long WAIT_TIME = TimeUnit.DAYS.toMillis(1);
    @Autowired
    private CouponRepo couponRepo;

    @Scheduled(timeUnit = TimeUnit.DAYS, fixedRate = 1)
    public void run() {
        System.out.println("Coupon expiration job is working");

        for (Coupon coupon : couponRepo.findAll()) {
            if (coupon.getEndDate().isBefore(LocalDate.now())) {
                couponRepo.delete(coupon);
            }
        }

    }

}
