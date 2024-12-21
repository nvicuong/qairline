package com.example.demosql.dto.request;

import com.example.demosql.validator.DobValidate;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdatePasswordRequest {
    String old_password ;

    @Size(min = 8, message = "INVALID_PASSWORD")
    String new_password;
}
