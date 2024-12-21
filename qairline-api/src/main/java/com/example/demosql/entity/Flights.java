package com.example.demosql.entity;

import com.example.demosql.enums.StatusFlight;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Flights {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id ;

    Long airplane_id;
    String airplane_name;

    Long remain_economy_seat;
    Long remain_business_seat;

    LocalDateTime departure_time;
    LocalDateTime arrival_time;

    Long departure_airport_id;
    Long arrival_airport_id ;

    Long economy_pricing ;
    Long business_pricing;

    String status ;
    String reason ;

    LocalDateTime created_at;
    LocalDateTime updated_at;

    @Column(name = "flight_code")
    String flightCode;

}
