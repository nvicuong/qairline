package com.example.demosql.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long user_id;

    LocalDateTime created_at;
    LocalDateTime updated_at;

    Double price;
    String status;
}
