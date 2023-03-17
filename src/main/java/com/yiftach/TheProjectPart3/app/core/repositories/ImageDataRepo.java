package com.yiftach.TheProjectPart3.app.core.repositories;

import com.yiftach.TheProjectPart3.app.core.entities.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageDataRepo extends JpaRepository<ImageData, Long> {
    public Optional<ImageData> findByName(String name);
}
