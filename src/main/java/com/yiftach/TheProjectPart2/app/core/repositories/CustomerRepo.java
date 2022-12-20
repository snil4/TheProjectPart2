package com.yiftach.TheProjectPart2.app.core.repositories;

import com.yiftach.TheProjectPart2.app.core.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {
}
