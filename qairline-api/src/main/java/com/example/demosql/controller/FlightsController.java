package com.example.demosql.controller;

import com.example.demosql.dto.request.FlightCreationRequest;
import com.example.demosql.dto.request.FlightUpdateRequest;
import com.example.demosql.dto.response.*;
import com.example.demosql.service.FlightsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/flights")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FlightsController {
    FlightsService flightsService;
    ObjectMapper objectMapper;

    @GetMapping
    public ApiResponse<ContentResponse<ElementFlightsResponse>> searchFlights(
            @RequestParam("departure_airport_id") Long departureAirportId,
            @RequestParam("arrival_airport_id") Long arrivalAirportId,
            @RequestParam("departure_time") String departureTimeStr)
//            @RequestParam("arrival_time") String arrivalTimeStr,
//            @RequestParam("seat_class") String seatClass) {
    {
        LocalDate departureTime = LocalDate.parse(departureTimeStr.trim());
        //LocalDate arrivalTime = LocalDate.parse(arrivalTimeStr.trim());

        log.info("Departure Time: {}", departureTime);
        //log.info("Arrival Time: {}", arrivalTime);
        //log.info("Seat Class: {}", seatClass);
        return ApiResponse.<ContentResponse<ElementFlightsResponse>>builder()
                .result(flightsService.findFlights(departureAirportId, arrivalAirportId, departureTime))
                .build();
    }

    @GetMapping("/find")
    ApiResponse<ContentResponse<ElementFlightsResponse>> getDestinations (
            @RequestParam(required = false) String city) {
        log.info(city);
        return ApiResponse.<ContentResponse<ElementFlightsResponse>>builder()
                .result(flightsService.findDestinations(city))
                .build();

    }
    @GetMapping("/search")
    public ApiResponse<ContentResponse<ElementFlightsResponse>> searchFlightsNew(
            @RequestParam("departure_time") String departureTimeStr)
    {
        LocalDate departureTime= LocalDate.parse(departureTimeStr.trim());


        return ApiResponse.<ContentResponse<ElementFlightsResponse>> builder()
                .result(flightsService.findFlightsNew(departureTime))
                .build();
    }
    @GetMapping("/search6")
    public ApiResponse<ContentResponse<ElementFlightsResponse>> searchFlight()
    {
        return ApiResponse.<ContentResponse<ElementFlightsResponse>> builder()
                .result(flightsService.findFlightsNow())
                .build();
    }


    @PostMapping("/create")
    ApiResponse<FlightResponse> createFLight(@RequestBody FlightCreationRequest request) {
        System.out.println("Endpoint /create called");
        ApiResponse<FlightResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(flightsService.createFlight(request));
        return apiResponse;
    }

    @GetMapping("/getAll")
    ApiResponse<List<HistoryFlightResponse>> getFlights() {
        return ApiResponse.<List<HistoryFlightResponse>>builder()
                .result(flightsService.getFlights())
                .build();
    }

    @GetMapping("/{flightId}")
    ApiResponse<FlightResponse> getFlight(@PathVariable("flightId") Long flightId) {
        return ApiResponse.<FlightResponse>builder()
                .result(flightsService.getFlight(flightId))
                .build();
    }

    @DeleteMapping("/delete/{flightId}")
    ApiResponse<String> deleteFlight(@PathVariable Long flightId) {
        System.out.println("con meo");
        flightsService.deleteFlight(flightId);
        return ApiResponse.<String>builder().result("Flight has been deleted").build();
    }

    @PutMapping("/update/{flightId}")
    ApiResponse<FlightResponse> updateUser(@PathVariable Long flightId, @RequestBody FlightUpdateRequest request) {
        return ApiResponse.<FlightResponse>builder()
                .result(flightsService.updateFlight(flightId, request))
                .build();
    }

    @GetMapping("/history/{userId}")
    ApiResponse<List<HistoryBookingFlightResponse>> getUserFlightHistory(@PathVariable Long userId) {
        return ApiResponse.<List<HistoryBookingFlightResponse>>builder()
                .result(flightsService.getUserFlightHistory(userId))
                .build();
    }

    @GetMapping("/future/{userId}")
    ApiResponse<List<HistoryBookingFlightResponse>> getUserFlightFuture(@PathVariable Long userId) {
        return ApiResponse.<List<HistoryBookingFlightResponse>>builder()
                .result(flightsService.getUserFlightFuture(userId))
                .build();
    }
    @GetMapping("/searchCode")
    ApiResponse<HistoryFlightResponse> searchCode(
            @RequestParam(required = false) String code) {
        return ApiResponse.<HistoryFlightResponse>builder()
                .result(flightsService.searchCode(code))
                .build();
    }
}
