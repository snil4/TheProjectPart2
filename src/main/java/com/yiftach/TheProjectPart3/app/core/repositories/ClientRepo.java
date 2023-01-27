package com.yiftach.TheProjectPart3.app.core.repositories;

import com.yiftach.TheProjectPart3.app.core.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepo extends JpaRepository<Client, Integer> {

    Optional<Client> findByEmailAndPassword(String email, String password);
}
