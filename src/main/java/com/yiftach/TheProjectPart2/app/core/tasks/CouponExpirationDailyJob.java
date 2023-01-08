package com.yiftach.TheProjectPart2.app.core.tasks;

import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import com.yiftach.TheProjectPart2.app.core.repositories.CouponRepo;
import net.bytebuddy.asm.Advice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManagerFactory;
import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class CouponExpirationDailyJob {

    private final long WAIT_TIME = TimeUnit.DAYS.toMillis(1);
    private static boolean quit = false;
    private static final Logger logger = LoggerFactory.getLogger(CouponExpirationDailyJob.class);
    @Autowired
    CouponRepo couponRepo;

    @Scheduled(timeUnit = TimeUnit.DAYS, fixedRate = 1)
    public void run() {
        System.out.println("Coupon expiration job is working");
        while (!quit) {
            List<Coupon> coupons = couponRepo.findAll();

            for (int i = 0; i < coupons.size(); i++) {
                if (coupons.get(i).getEndDate().isBefore(LocalDate.now())) {
                    coupons.remove(coupons.get(i));
                    i = 0;
                }
            }

        }
    }

    public static void stop() {
        quit = true;
    }

    public static void start() {
        quit = false;
    }

}
