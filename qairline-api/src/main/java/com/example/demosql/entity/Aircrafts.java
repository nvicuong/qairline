package com.example.demosql.entity;
import com.example.demosql.enums.StatusAircraft;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.Year;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Aircrafts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long manufacturer_id;

    String manufacturer;
    String name ;
    String aircraft_type;
    String registration_code;
    String status = StatusAircraft.ACTIVE.name();

    Long business_seat;
    Long economy_seat;
    Long year_of_manufacture;
}
