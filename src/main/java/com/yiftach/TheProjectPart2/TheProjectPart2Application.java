package com.yiftach.TheProjectPart2;

import com.yiftach.TheProjectPart2.app.core.tasks.CouponExpirationDailyJob;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.concurrent.TimeUnit;

@SpringBootApplication
@EnableScheduling
public class TheProjectPart2Application {

	private static ConfigurableApplicationContext context;

	public static void main(String[] args) throws InterruptedException {
		context = SpringApplication.run(TheProjectPart2Application.class, args);
		stop();
	}

	public static void stop() {
		context.stop();
	}

}
