package com.yiftach.TheProjectPart3.app.core.repositories;

import com.yiftach.TheProjectPart3.app.core.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepo extends JpaRepository<Company,Integer> {

    Optional<Company> findByEmail(String email);

    Optional<Company> findByName(String name);

    Optional<Company> findByEmailAndPassword(String email,String password);

}
