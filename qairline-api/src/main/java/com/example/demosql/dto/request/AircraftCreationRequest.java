package com.example.demosql.dto.request;

import com.example.demosql.enums.StatusAircraft;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AircraftCreationRequest {
    String name;
    String manufacturer;
    String registration_code;
    String aircraft_type;
    Long year_of_manufacture;
    String status  = StatusAircraft.ACTIVE.name();
    Long economy_seat;
    Long business_seat;


}
