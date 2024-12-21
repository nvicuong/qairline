package com.example.demosql.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ElementFlightsResponse {

    Long flight_id;
    LocalDateTime departure_time;
    LocalDateTime arrival_time;

    private airportRep departureAirport;
    private airportRep arrivalAirport;
    private aircraftRep aircraft;

    //Double[] pricing;
    Long[] remaining_seats;

    Long economy_pricing;
    Long business_pricing;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor    public static class airportRep {
        private Long id;
        private String name;
        private String city;
        private String code;
    }
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class aircraftRep {
        private Long id;
        private String name;

    }
}
