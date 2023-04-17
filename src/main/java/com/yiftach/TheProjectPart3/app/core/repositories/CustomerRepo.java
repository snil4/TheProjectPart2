package com.yiftach.TheProjectPart3.app.core.repositories;

import com.yiftach.TheProjectPart3.app.core.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {

    Optional<Customer> findByEmailAndPassword(String email, String password);

    Optional<Customer> findByEmail(String email);

}
