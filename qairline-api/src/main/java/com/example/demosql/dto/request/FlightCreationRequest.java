package com.example.demosql.dto.request;

import com.example.demosql.enums.StatusFlight;
import com.example.demosql.validator.DobValidate;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor //tao hai constructer đầy đủ và không có
@AllArgsConstructor
@Builder // tạo mới : UserCreationRequest u = UserCreationRequest.builder().username("")....build()
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlightCreationRequest {

    String airplane_name;

    Long remain_economy_seat;
    Long remain_business_seat;

    LocalDateTime departure_time;
    LocalDateTime arrival_time;

    String  departure_airport;
    String arrival_airport ;

    Long economy_pricing;
    Long business_pricing;


    LocalDateTime created_at;
    LocalDateTime updated_at;

}
