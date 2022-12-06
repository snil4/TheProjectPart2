package com.yiftach.TheProjectPart2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class TheProjectPart2Application {

	public static void main(String[] args) {
		SpringApplication.run(TheProjectPart2Application.class, args);
	}

}
