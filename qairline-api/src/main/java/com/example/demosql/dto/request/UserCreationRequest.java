package com.example.demosql.dto.request;

import com.example.demosql.validator.DobValidate;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor //tao hai constructer đầy đủ và không có
@AllArgsConstructor
@Builder // tạo mới : UserCreationRequest u = UserCreationRequest.builder().username("")....build()
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {

    @Size(min = 3, message = "USERNAME_INVALID")
    String username;

    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;

//    String address;
//    @Size(min = 10 , message = "INVALID_PHONE_NUMBER")
//    String phone_number;
//    String email;
//    String gender;

//    @DobValidate(min = 18 , message = "INVALID_DOB")
//    LocalDate birthday ;

}
