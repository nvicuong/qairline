package com.example.demosql.repository;

import com.example.demosql.entity.Tickets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TicketsRepository extends JpaRepository<Tickets,Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM Tickets t WHERE t.booking_id = :bookingId")
    void deleteByBookingId(@Param("bookingId") Long bookingId);

    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE tickets AUTO_INCREMENT = :value", nativeQuery = true)
    void resetAutoIncrement(@Param("value") Long value);

    @Query("SELECT MAX(t.id) FROM Tickets t")
    Long findMaxId();

    @Query("SELECT t FROM Tickets t WHERE t.booking_id = :bookingId")
    List<Tickets> findByBookingId(@Param("bookingId") Long bookingId);


}
