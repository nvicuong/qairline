package com.example.demosql.repository;


import com.example.demosql.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentsRepository extends JpaRepository<Payments,Long> {

}

