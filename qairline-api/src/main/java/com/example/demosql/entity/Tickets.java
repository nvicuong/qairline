package com.example.demosql.entity;


import com.example.demosql.enums.ClassSeat;
import com.example.demosql.enums.TypeSeat;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Tickets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id ;

    Long booking_id;
    Long flight_id;

    String seat_class = ClassSeat.ADULTS.name();
    String seat_type = TypeSeat.ECONOMY.name();

    double pricing ;

    LocalDateTime created_at;
    LocalDateTime updated_at;

    Long num;

}
