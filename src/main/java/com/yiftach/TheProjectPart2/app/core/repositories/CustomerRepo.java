package com.yiftach.TheProjectPart2.app.core.repositories;

import com.yiftach.TheProjectPart2.app.core.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM customer c " +
            "WHERE c.email = :email AND c.password = :password")
    public boolean isCustomerExists(@Param("email") String email, @Param("password") String password);
}
