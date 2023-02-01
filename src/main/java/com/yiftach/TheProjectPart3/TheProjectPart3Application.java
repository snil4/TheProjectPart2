package com.yiftach.TheProjectPart3;

import com.yiftach.TheProjectPart3.app.core.filters.AuthenticationFilter;
import com.yiftach.TheProjectPart3.app.core.filters.AuthorizationFilter;
import com.yiftach.TheProjectPart3.app.core.util.JwtUtil;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Collections;

@SpringBootApplication
@EnableScheduling
@EnableJpaRepositories("com.yiftach.TheProjectPart3.app.core")
public class TheProjectPart3Application {

	private static ConfigurableApplicationContext context;

	public static void main(String[] args) throws InterruptedException {
		context = SpringApplication.run(TheProjectPart3Application.class, args);
	}

	public static void stop() {
		context.stop();
	}

	@Bean
	FilterRegistrationBean<AuthenticationFilter> authenticationFilter(JwtUtil jwtUtil){
		AuthenticationFilter authenticationFilter = new AuthenticationFilter(jwtUtil);
		FilterRegistrationBean<AuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(authenticationFilter);
		registrationBean.setUrlPatterns(Collections.singleton("/api/*"));
		registrationBean.setOrder(1);
		return registrationBean;
	}

	@Bean
	FilterRegistrationBean<AuthorizationFilter> authorizationFiler(){
		AuthorizationFilter authorizationFilter = new AuthorizationFilter();
		FilterRegistrationBean<AuthorizationFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter((authorizationFilter));
		registrationBean.addUrlPatterns("/api/admin/*", "/api/company/*", "/api/customer/*");
		registrationBean.setOrder(2);
		return registrationBean;
	}

	@Bean
	OpenAPI customOpenAPI() {
		return new OpenAPI().info(new Info().title("title").version("version").description("description"))
				.addSecurityItem(new SecurityRequirement().addList("my security"))
				.components(new Components().addSecuritySchemes("my security",
						new SecurityScheme().name("my security").type(SecurityScheme.Type.HTTP).scheme("bearer")));
	}

}
