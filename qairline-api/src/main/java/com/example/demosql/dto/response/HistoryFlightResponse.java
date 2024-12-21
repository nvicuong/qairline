package com.example.demosql.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HistoryFlightResponse {
    Long id;
    String flight_code;
    LocalDateTime departure_time;
    LocalDateTime arrival_time;
    String from ;
    String fromCode;
    String to;
    String toCode;

    Long economy_pricing;
    Long business_pricing;

    Long remain_economy_seat;
    Long remain_business_seat;

    LocalDateTime created_at;
    LocalDateTime updated_at;

}
