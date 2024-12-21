package com.example.demosql.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Airports {
    @Id // khoa chinh
    @GeneratedValue(strategy = GenerationType.IDENTITY) // sinh tự động đối tượng id
    Long id;

    String code;
    String name;
    String country;
    String city;
    String link;
}
