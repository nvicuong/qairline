package com.example.demosql.repository;


import com.example.demosql.entity.Airports;
import com.example.demosql.entity.Manufacturers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Repository
public interface ManufacturesRepository extends JpaRepository<Manufacturers,Long> {

    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE manufacturers AUTO_INCREMENT = :value", nativeQuery = true)
    void resetAutoIncrement(@Param("value") Long value);

    @Query("SELECT MAX(m.id) FROM Manufacturers m")
    Long findMaxId();
}

