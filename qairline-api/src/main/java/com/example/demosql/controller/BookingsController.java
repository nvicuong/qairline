package com.example.demosql.controller;

import com.example.demosql.dto.request.BookingCreationRequest;
import com.example.demosql.dto.request.FlightCreationRequest;
import com.example.demosql.dto.response.AirportsResponse;
import com.example.demosql.dto.response.ApiResponse;
import com.example.demosql.dto.response.BookingResponse;
import com.example.demosql.dto.response.FlightResponse;
import com.example.demosql.service.AirportsService;
import com.example.demosql.service.BookingsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("bookings")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BookingsController {
    BookingsService bookingsService;

    @GetMapping("/getAll")
    ApiResponse<List<BookingResponse>> getAirports() {
        return ApiResponse.<List<BookingResponse>>builder()
                .result(bookingsService.getAirports())
                .build();
    }

    @DeleteMapping("/delete/{bookingId}")
    ApiResponse<String> deleteBooking(@PathVariable Long bookingId) {
        bookingsService.deleteBooking(bookingId);
        return ApiResponse.<String>builder().result("Booking has been deleted").build();
    }
    @PostMapping("/create")
    ApiResponse<BookingResponse> createBooking (@RequestBody BookingCreationRequest request) {
        System.out.println("Endpoint /create called");
        ApiResponse<BookingResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(bookingsService.createBooking(request));
        return apiResponse;
    }
}
