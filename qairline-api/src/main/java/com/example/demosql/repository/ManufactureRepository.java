package com.example.demosql.repository;

import com.example.demosql.entity.Manufacturers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManufactureRepository extends JpaRepository<Manufacturers,Long> {
    Manufacturers findByName(String name);
}
