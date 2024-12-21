package com.example.demosql.repository;

import com.example.demosql.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    boolean existsByUsername(String username);
    Optional<User> findByUsername(String name);
    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE user AUTO_INCREMENT = :value", nativeQuery = true)
    void resetAutoIncrement(@Param("value") Long value);

    @Query("SELECT MAX(u.id) FROM User u")
    Long findMaxId();



}
