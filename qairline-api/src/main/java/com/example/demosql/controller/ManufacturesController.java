package com.example.demosql.controller;

import com.example.demosql.dto.request.UserCreationRequest;
import com.example.demosql.dto.response.ApiResponse;
import com.example.demosql.dto.response.UserResponse;
import com.example.demosql.service.ManufacturesService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("manufactures")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ManufacturesController {
    ManufacturesService manufacturesService;

    @DeleteMapping("/delete/{Id}")
    ApiResponse<String> deleteManufacture(@PathVariable Long Id) {
        manufacturesService.deleteManufacture(Id);
        return ApiResponse.<String>builder().result("Manufacture has been deleted").build();
    }
}
