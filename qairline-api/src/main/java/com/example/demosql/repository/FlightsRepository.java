package com.example.demosql.repository;

import com.example.demosql.dto.response.FlightResponse;
import com.example.demosql.dto.response.HistoryFlightResponse;
import com.example.demosql.dto.response.HistoryBookingFlightResponse;
import com.example.demosql.entity.Flights;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightsRepository extends JpaRepository<Flights, Long> {
    @Query(value = "SELECT f.id, f.departure_time, f.arrival_time, " +
            "a1.id AS departureAirportId, a1.name AS departureAirportName, a1.city AS departureCity, a1.code AS departureCode, " +
            "a2.id AS arrivalAirportId, a2.name AS arrivalAirportName, a2.city AS arrivalCity, a2.code AS arrivalCode, " +
            "aircraft.id AS aircraftId, aircraft.name AS aircraftName, " +
            "f.remain_economy_seat AS remainingEconomySeats, " +
            "f.remain_business_seat AS remainingBusinessSeats, " +
            "f.economy_pricing AS economyPricing, " +
            "f.business_pricing AS businessPricing " +
            "FROM flights f " +
            "JOIN airports a1 ON f.departure_airport_id = a1.id " +
            "JOIN airports a2 ON f.arrival_airport_id = a2.id " +
            "JOIN aircrafts aircraft ON f.airplane_id = aircraft.id " +
            "WHERE f.departure_airport_id = :departure_airport_id " +
            "AND f.arrival_airport_id = :arrival_airport_id " +
            "AND CAST(f.departure_time AS DATE) = :departure_time " +
            "GROUP BY f.id, a1.id, a2.id, aircraft.id", nativeQuery = true)
    List<Object[]> findFlightsNative(@Param("departure_airport_id") Long departureAirportId,
                                     @Param("arrival_airport_id") Long arrivalAirportId,
                                     @Param("departure_time") LocalDate departureTime);

    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE flights AUTO_INCREMENT = :value", nativeQuery = true)
    void resetAutoIncrement(@Param("value") Long value);

    @Query("SELECT MAX(f.id) FROM Flights f")
    Long findMaxId();
    @Query("""
    SELECT new com.example.demosql.dto.response.HistoryFlightResponse(
        f.id,
        f.flightCode,
        f.departure_time, 
        f.arrival_time, 
        a1.name, 
        a1.code, 
        a2.name, 
        a2.code, 
        f.economy_pricing, 
        f.business_pricing, 
        f.remain_economy_seat, 
        f.remain_business_seat,
        f.created_at,
        f.updated_at
    )
    FROM Flights f
    JOIN Airports a1 ON f.departure_airport_id = a1.id
    JOIN Airports a2 ON f.arrival_airport_id = a2.id
""")
    List<HistoryFlightResponse> getFlightDetails();
    //    SELECT new com.example.demosql.dto.response.HistoryBookingFlightResponsense(
    @Query("""
    SELECT new com.example.demosql.dto.response.HistoryBookingFlightResponse(
        f.id,
        b.id,
        b.status,
        f.flightCode,
        f.departure_time,
        a1.name,
        a2.name,
        b.created_at,
        COUNT(t.id),
        SUM(t.pricing),
        SUM(CASE WHEN t.seat_type = 'adult' THEN 1 ELSE 0 END),
        SUM(CASE WHEN t.seat_type = 'child' THEN 1 ELSE 0 END),
        SUM(CASE WHEN t.seat_class = 'business' THEN 1 ELSE 0 END),
        SUM(CASE WHEN t.seat_class = 'economy' THEN 1 ELSE 0 END)
    )
    FROM Bookings b
    JOIN Tickets t ON b.id = t.booking_id
    JOIN Flights f ON t.flight_id = f.id
    JOIN Airports a1 ON f.departure_airport_id = a1.id
    JOIN Airports a2 ON f.arrival_airport_id = a2.id
    WHERE b.user_id = :userId
    GROUP BY f.id, b.id, b.status, f.flightCode, f.departure_time, a1.name, a2.name, b.created_at
""")
    List<HistoryBookingFlightResponse> getUserFlightHistory(Long userId);
    @Query("""
    SELECT new com.example.demosql.dto.response.HistoryBookingFlightResponse(
        f.id,
        b.id,
        b.status,
        f.flightCode,
        f.departure_time,
        a1.name,
        a2.name,
        b.created_at, 
        COUNT(t.id), 
        SUM(t.pricing),
        SUM(CASE WHEN t.seat_type = 'adult' THEN 1 ELSE 0 END),
        SUM(CASE WHEN t.seat_type = 'child' THEN 1 ELSE 0 END),
        SUM(CASE WHEN t.seat_class = 'business' THEN 1 ELSE 0 END),                    
        SUM(CASE WHEN t.seat_class = 'economy' THEN 1 ELSE 0 END)       
        )
    FROM Bookings b
    JOIN Tickets t ON b.id = t.booking_id
    JOIN Flights f ON t.flight_id = f.id
    JOIN Airports a1 ON f.departure_airport_id = a1.id
    JOIN Airports a2 ON f.arrival_airport_id = a2.id
    WHERE b.user_id = :userId
    AND f.departure_time > CURRENT_TIMESTAMP 
    AND b.status = "SUCCESS"
    GROUP BY f.id, b.id, b.status, f.flightCode, f.departure_time, a1.name, a2.name, b.created_at
""")
    List<HistoryBookingFlightResponse> getUserFlightFuture(Long userId);

    @Query(value = "SELECT f.id, f.departure_time, f.arrival_time, " +
            "a1.id AS departureAirportId, a1.name AS departureAirportName, a1.city AS departureCity, a1.code AS departureCode, " +
            "a2.id AS arrivalAirportId, a2.name AS arrivalAirportName, a2.city AS arrivalCity, a2.code AS arrivalCode, " +
            "aircraft.id AS aircraftId, aircraft.name AS aircraftName, " +
            "f.remain_economy_seat AS remainingEconomySeats, " +
            "f.remain_business_seat AS remainingBusinessSeats, " +
            "f.economy_pricing AS economyPricing, " +
            "f.business_pricing AS businessPricing " +
            "FROM flights f " +
            "JOIN airports a1 ON f.departure_airport_id = a1.id " +
            "JOIN airports a2 ON f.arrival_airport_id = a2.id " +
            "JOIN aircrafts aircraft ON f.airplane_id = aircraft.id " +
            "WHERE CAST(f.departure_time AS DATE) = :departure_time " +
            "GROUP BY f.id, a1.id, a2.id, aircraft.id", nativeQuery = true)
    List<Object[]> getFlightDetailsNew(@Param("departure_time") LocalDate departureTime);

    @Query(value = "SELECT f.id, f.departure_time, f.arrival_time, " +
            "a1.id AS departureAirportId, a1.name AS departureAirportName, a1.city AS departureCity, a1.code AS departureCode, " +
            "a2.id AS arrivalAirportId, a2.name AS arrivalAirportName, a2.city AS arrivalCity, a2.code AS arrivalCode, " +
            "aircraft.id AS aircraftId, aircraft.name AS aircraftName, " +
            "f.remain_economy_seat AS remainingEconomySeats, " +
            "f.remain_business_seat AS remainingBusinessSeats, " +
            "f.economy_pricing AS economyPricing, " +
            "f.business_pricing AS businessPricing " +
            "FROM flights f " +
            "JOIN airports a1 ON f.departure_airport_id = a1.id " +
            "JOIN airports a2 ON f.arrival_airport_id = a2.id " +
            "JOIN aircrafts aircraft ON f.airplane_id = aircraft.id " +
            "WHERE f.departure_time > CURRENT_TIMESTAMP " +
            "GROUP BY f.id, a1.id, a2.id, aircraft.id " +
            "ORDER BY f.departure_time ASC " +
            "LIMIT 6", nativeQuery = true)
    List<Object[]> getFlightNow();

    @Query(value = "SELECT f.id, f.departure_time, f.arrival_time, " +
            "a1.id AS departureAirportId, a1.name AS departureAirportName, a1.city AS departureCity, a1.code AS departureCode, " +
            "a2.id AS arrivalAirportId, a2.name AS arrivalAirportName, a2.city AS arrivalCity, a2.code AS arrivalCode, " +
            "aircraft.id AS aircraftId, aircraft.name AS aircraftName, " +
            "f.remain_economy_seat AS remainingEconomySeats, " +
            "f.remain_business_seat AS remainingBusinessSeats, " +
            "f.economy_pricing AS economyPricing, " +
            "f.business_pricing AS businessPricing " +
            "FROM flights f " +
            "JOIN airports a1 ON f.departure_airport_id = a1.id " +
            "JOIN airports a2 ON f.arrival_airport_id = a2.id " +
            "JOIN aircrafts aircraft ON f.airplane_id = aircraft.id " +
            "WHERE f.departure_time > CURRENT_TIMESTAMP " +
            "AND LOWER(a2.city) = LOWER(:city)", nativeQuery = true)
    List<Object[]> findDestinations(@Param("city") String city);

    @Query("""
    SELECT new com.example.demosql.dto.response.HistoryFlightResponse(
        f.id,
        f.flightCode,
        f.departure_time, 
        f.arrival_time, 
        a1.name, 
        a1.code, 
        a2.name, 
        a2.code, 
        f.economy_pricing, 
        f.business_pricing, 
        f.remain_economy_seat, 
        f.remain_business_seat,
        f.created_at,
        f.updated_at
    )
    FROM Flights f
    JOIN Airports a1 ON f.departure_airport_id = a1.id
    JOIN Airports a2 ON f.arrival_airport_id = a2.id
    Where f.flightCode = :code
""")
    HistoryFlightResponse findByFlightCode(String code);

}

//            "MAX(CASE WHEN :seat_class =  t.seat_class AND t.seat_type = 'adult' THEN t.pricing ELSE 0 END) AS adultPrice, " +
//            "MAX(CASE WHEN :seat_class =  t.seat_class  AND t.seat_type = 'child' THEN t.pricing ELSE 0 END) AS childPrice, " +
//            "AND f.arrival_time <= :arrival_time " +