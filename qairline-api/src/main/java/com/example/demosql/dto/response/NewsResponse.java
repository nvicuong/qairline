package com.example.demosql.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewsResponse {

    Long id;
    String title;
    String content;
    String type;
    String image;
    LocalDateTime created_at;

}
