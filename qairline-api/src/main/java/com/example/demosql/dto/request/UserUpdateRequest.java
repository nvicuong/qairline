package com.example.demosql.dto.request;

import com.example.demosql.validator.DobValidate;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {

    String full_name;
    String address;
    String email;
    @Size(min = 10 , message = "INVALID_PHONE_NUMBER")
    String phone_number ;
    String gender;

    @DobValidate(min = 18, message = "INVALID_DOB")
    LocalDate birthday;
}
