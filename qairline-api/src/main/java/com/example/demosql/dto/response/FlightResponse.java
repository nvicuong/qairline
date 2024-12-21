package com.example.demosql.dto.response;

import com.example.demosql.enums.StatusFlight;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlightResponse {
    Long id ;

    Long airplane_id;
    String airplane_name;


    Long remain_economy_seat;
    Long remain_business_seat;

    LocalDateTime departure_time;
    LocalDateTime arrival_time;

    Long economy_pricing;
    Long business_pricing;

    Long departure_airport_id;
    Long arrival_airport_id ;

    String status ;
    String reason ;

    LocalDateTime created_at;
    LocalDateTime updated_at;

    String flightCode;
}
