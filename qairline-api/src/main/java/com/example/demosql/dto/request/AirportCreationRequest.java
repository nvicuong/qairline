package com.example.demosql.dto.request;

import com.example.demosql.enums.StatusAircraft;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AirportCreationRequest {
    String code;
    String name ;
    String country;
    String city;
}
