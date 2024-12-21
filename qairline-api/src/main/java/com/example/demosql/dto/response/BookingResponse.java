package com.example.demosql.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingResponse {
   Long id;
   String name ;
   String status;
   String flight_code;
   Long num_tickets;
   Double price ;
   LocalDateTime created_at;
   LocalDateTime update_at;
}
