package com.example.demosql.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HistoryBookingFlightResponse {
    Long id;
    Long booking_id;
    String status;
    String flight_code;
    LocalDateTime departure_time_fly;
    String from ;
    String to;
    LocalDateTime departure_time_book;
    Long num_tickets;
    Double price;
    Long num_ticket_adult;
    Long num_ticket_child;
    Long num_ticket_business;
    Long num_ticket_economy;
}
