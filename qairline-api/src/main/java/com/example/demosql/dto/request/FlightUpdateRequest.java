package com.example.demosql.dto.request;

import com.example.demosql.validator.DobValidate;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightUpdateRequest {
    LocalDateTime departure_time;
    LocalDateTime arrival_time;

    String status ;
    String reason ;
}
