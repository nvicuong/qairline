package com.example.demosql.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {

    String id;
    String username;
    String full_name;

    String address;
    String phone_number;
    String email;
    String gender;

    LocalDate birthday;
    String role;
}
