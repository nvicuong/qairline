package com.example.demosql.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class User {
    @Id // khoa chinh
    @GeneratedValue(strategy = GenerationType.IDENTITY) // sinh tự động đối tượng id
    Long id;
    @Column(name = "username" , unique = true , columnDefinition = "VARCHAR(255) COLLATE utf8mb4_unicode_ci")
    // không phân biệt hòa thường và để tạo tk không bị trùng
    String username;
    String full_name;
    String password;

    String address;
    String phone_number;
    String email;
    String gender;

    LocalDate birthday ;
    String role;

}
