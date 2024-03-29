package com.yiftach.TheProjectPart2.app.core.repositories;

import com.yiftach.TheProjectPart2.app.core.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {

    boolean existsByEmail(String email);

    boolean existsByEmailAndPassword(String email, String password);

    Optional<Customer> findByEmail(String email);
}
