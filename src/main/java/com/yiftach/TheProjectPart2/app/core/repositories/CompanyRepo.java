package com.yiftach.TheProjectPart2.app.core.repositories;

import com.yiftach.TheProjectPart2.app.core.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CompanyRepo extends JpaRepository<Company,Integer> {
}
