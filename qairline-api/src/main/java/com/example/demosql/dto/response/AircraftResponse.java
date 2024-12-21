package com.example.demosql.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AircraftResponse {

    Long id;
    Long manufacturer_id;

    String name;
    String manufacturer;
    String registration_code;
    String aircraft_type;
    Long year_of_manufacture;

    Long economy_seat;
    Long business_seat;

}
