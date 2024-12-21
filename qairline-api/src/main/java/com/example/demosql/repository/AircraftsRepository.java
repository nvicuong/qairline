package com.example.demosql.repository;


import com.example.demosql.entity.Aircrafts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AircraftsRepository extends JpaRepository<Aircrafts,Long> {
    boolean existsByName(String name);
    Aircrafts findByName(String name);

    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE aircrafts AUTO_INCREMENT = :value", nativeQuery = true)
    void resetAutoIncrement(@Param("value") Long value);

    @Query("SELECT MAX(a.id) FROM Aircrafts a")
    Long findMaxId();
}

