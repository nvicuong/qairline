package com.example.demosql.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor //tao hai constructer đầy đủ và không có
@AllArgsConstructor
@Builder // tạo mới : UserCreationRequest u = UserCreationRequest.builder().username("")....build()
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingCreationRequest {
    Long user_id;
    Long flight_id;

    Long num_ticket_adult;
    Long num_ticket_child;

    Double price;
    String style_class;

    LocalDateTime created_at;
    LocalDateTime updated_at;
}
