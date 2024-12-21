package com.example.demosql.repository;


import com.example.demosql.entity.Aircrafts;
import com.example.demosql.entity.Airports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Repository
public interface AirportsRepository extends JpaRepository<Airports,Long> {
    @Query(value = "SELECT city AS cityName, country AS countryName, link AS imageLink " +
            "FROM airports " +
            "WHERE (:country IS NULL OR country = :country) " +
            "LIMIT :numberPerPage OFFSET :offset", nativeQuery = true)
    List<Map<String, Object>> findDestinations(
            @Param("country") String country,
            @Param("numberPerPage") int numberPerPage,
            @Param("offset") int offset
    );
    Airports findByName(String name);
    boolean existsByName(String name);
    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE airports AUTO_INCREMENT = :value", nativeQuery = true)
    void resetAutoIncrement(@Param("value") Long value);

    @Query("SELECT MAX(a.id) FROM Airports a")
    Long findMaxId();
}

