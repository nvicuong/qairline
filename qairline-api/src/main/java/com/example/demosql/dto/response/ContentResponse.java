package com.example.demosql.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContentResponse<T> {
    String number_of_page;
    String number_per_page;
    String current_page;
    List<T> elements;
}
