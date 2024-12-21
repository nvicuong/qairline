package com.example.demosql.controller;

import com.example.demosql.dto.request.AirportCreationRequest;
import com.example.demosql.dto.request.NewCreationRequest;
import com.example.demosql.dto.request.UserCreationRequest;
import com.example.demosql.dto.response.*;
import com.example.demosql.service.AirportsService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
//@RequestMapping("airports")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AirportsController {
    AirportsService airportsService;

    @GetMapping("destinations")
    ApiResponse<ContentResponse<ElementDestinationsResponse>> getDestinations(
            @RequestParam(required = false) String country,
            @RequestParam(defaultValue = "10") int number_per_page,
            @RequestParam(defaultValue = "1") int current_page) {

        return ApiResponse.<ContentResponse<ElementDestinationsResponse>>builder()
                .result(airportsService.getDestinations(country, number_per_page, current_page))
                .build();
    }

    @PostMapping(value = "airports/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<AirportsResponse> createAirport(@RequestPart("json") AirportCreationRequest request,
                                                @RequestPart("image") MultipartFile image) {
        ApiResponse<AirportsResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(airportsService.createAirport(request,image));
        return apiResponse;
    }
    @GetMapping("airports/getAll")
    ApiResponse<List<AirportsResponse>> getAirports() {
        return ApiResponse.<List<AirportsResponse>>builder()
                .result(airportsService.getAirports())
                .build();
    }
    @DeleteMapping("airports/delete/{airportId}")
    ApiResponse<String> deleteAirport(@PathVariable Long airportId) {
        //System.out.println("con meo");
        airportsService.deleteAirport(airportId);
        return ApiResponse.<String>builder().result("Airport has been deleted").build();
    }
}
