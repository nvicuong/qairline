package com.example.demosql.dto.request;

import com.example.demosql.enums.StatusAircraft;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewCreationRequest {
    String title;
    String type;
    String content;
}
