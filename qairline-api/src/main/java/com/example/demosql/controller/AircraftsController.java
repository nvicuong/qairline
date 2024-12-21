package com.example.demosql.controller;

import com.example.demosql.dto.request.AircraftCreationRequest;
import com.example.demosql.dto.request.UserCreationRequest;
import com.example.demosql.dto.response.*;
import com.example.demosql.service.AircraftService;
import com.example.demosql.service.AirportsService;
import com.example.demosql.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("aircraft")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AircraftsController {
    AircraftService aircraftService;

    @PostMapping("/create")
    ApiResponse<AircraftResponse> createAircraft(@RequestBody AircraftCreationRequest request) {
        ApiResponse<AircraftResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(aircraftService.createAircraft(request));
        return apiResponse;
    }
    @GetMapping("/getAll")
    ApiResponse<List<AircraftResponse>> getAircrafts() {
        return ApiResponse.<List<AircraftResponse>>builder()
                .result(aircraftService.getAircrafts())
                .build();
    }
    @DeleteMapping("/delete/{aircraftId}")
    ApiResponse<String> deleteAircraft(@PathVariable Long aircraftId) {
        //System.out.println("con meo");
        aircraftService.deleteAircraft(aircraftId);
        return ApiResponse.<String>builder().result("Aircraft has been deleted").build();
    }
}
