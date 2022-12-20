package com.yiftach.TheProjectPart2.app.core.tasks;

import com.yiftach.TheProjectPart2.app.core.entities.Coupon;
import com.yiftach.TheProjectPart2.app.core.repositories.CouponRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

@Component
public class CouponExpirationDailyJob implements Runnable {

    private final long WAIT_TIME = TimeUnit.DAYS.toMillis(1);
    private boolean quit = false;
    private Thread thread = new Thread(this);
    @Autowired
    private CouponRepo couponRepo;


    public void run() {
        while (!quit) {
            try {

                for (Coupon coupon : couponRepo.findAll()) {
                    if (coupon.getEndDate().isBefore(LocalDate.now())) {
                        couponRepo.delete(coupon);

                    }
                }

                synchronized (this) {
                    wait(WAIT_TIME);
                }

            } catch (InterruptedException e) {
                quit = true;
            }

        }
    }

    public void stop() {
        thread.interrupt();
    }

    public void start() {
        quit = false;
        thread.start();
    }

}
