package com.example.demosql.repository;


import com.example.demosql.dto.response.BookingResponse;
import com.example.demosql.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings,Long> {
    @Query(value = "SELECT " +
            "b.id AS bookingId, " +
            "u.full_name AS fullName, " +
            "f.airplane_name AS airplaneName, " +
            "b.status AS status," +
            "SUM(t.num) AS ticketCount, " +
            "SUM(t.pricing * t.num) AS totalPricing, " +
            "b.created_at AS createdAt, " +
            "b.updated_at AS updatedAt " +
            "FROM bookings b " +
            "JOIN user u ON b.user_id = u.id " +
            "JOIN tickets t ON b.id = t.booking_id " +
            "JOIN flights f ON t.flight_id = f.id " +
            "GROUP BY b.id, u.username, b.status, f.airplane_name",
            nativeQuery = true)
    List<Map<String, Object>> findAllBookingDetails();
    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE bookings AUTO_INCREMENT = :value", nativeQuery = true)
    void resetAutoIncrement(@Param("value") Long value);

    @Query("SELECT MAX(b.id) FROM Bookings b")
    Long findMaxId();


    @Query("""
    SELECT new com.example.demosql.dto.response.BookingResponse(
        b.id,
        u.username,
        b.status,
        f.flightCode,
        SUM(t.num),
        SUM(t.pricing * t.num),
        b.created_at,
        b.updated_at
    )
    FROM Bookings b
    JOIN User u ON b.user_id = u.id
    JOIN Tickets t ON b.id = t.booking_id
    JOIN Flights f ON t.flight_id = f.id
    WHERE b.id = :book_id
    GROUP BY b.id, u.username,b.status, f.flightCode, b.created_at, b.updated_at
""")
    BookingResponse toBookingResponse( @Param("book_id") Long book_id);


}

