package com.example.demosql.dto.response;



import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ElementDestinationsResponse {
    String city_name;
    String country_name;
    String image_link;
}
