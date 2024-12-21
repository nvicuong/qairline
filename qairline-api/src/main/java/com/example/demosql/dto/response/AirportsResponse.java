package com.example.demosql.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AirportsResponse {

    Long id;
    String code;

    String name;
    String country;
    String city;
    String link;

}
