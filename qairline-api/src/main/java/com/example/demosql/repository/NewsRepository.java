package com.example.demosql.repository;


import com.example.demosql.entity.Aircrafts;
import com.example.demosql.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface NewsRepository extends JpaRepository<News,Long> {
    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE news AUTO_INCREMENT = :value", nativeQuery = true)
    void resetAutoIncrement(@Param("value") Long value);

    @Query("SELECT MAX(n.id) FROM News n")
    Long findMaxId();
}

