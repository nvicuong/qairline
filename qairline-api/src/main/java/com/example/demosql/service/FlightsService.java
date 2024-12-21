package com.example.demosql.service;


import com.example.demosql.dto.request.FlightCreationRequest;
import com.example.demosql.dto.request.FlightUpdateRequest;
import com.example.demosql.dto.response.*;
import com.example.demosql.entity.Aircrafts;
import com.example.demosql.entity.Flights;
import com.example.demosql.entity.User;
import com.example.demosql.enums.StatusFlight;
import com.example.demosql.exception.ErrorCode;
import com.example.demosql.exception.MyException;
import com.example.demosql.mapper.FlightMapper;
import com.example.demosql.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FlightsService {
    private final NewsRepository newsRepository;
    UserRepository userRepository;
    FlightsRepository flightsRepository;
    FlightMapper flightMapper;
    AircraftsRepository aircraftsRepository;
    AirportsRepository airportsRepository;

    public ContentResponse<ElementFlightsResponse> findFlights(Long departureAirportId, Long arrivalAirportId,
                                                               LocalDate departureTime) {
        //log.info("Seat Class: {}", seatClass);
        // log nó ra : economy rồi
        List<Object[]> flights = flightsRepository.findFlightsNative(departureAirportId, arrivalAirportId,
                departureTime);
        for (Object[] row : flights) {
            System.out.println(Arrays.toString(row)); // In toàn bộ dòng dữ liệu
        }
        List<ElementFlightsResponse> responseList = mapToElementFlightsResponse(flights);
        ContentResponse<ElementFlightsResponse> contentResponse = new ContentResponse<>();
        contentResponse.setElements(responseList);

        return contentResponse;
    }
    public  ContentResponse<ElementFlightsResponse> findFlightsNew(LocalDate departureTime) {
        List<Object[]> flights = flightsRepository.getFlightDetailsNew(departureTime);
        for (Object[] row : flights) {
            System.out.println(Arrays.toString(row));
        }
        List<ElementFlightsResponse> responseList = mapToElementFlightsResponse(flights);
        ContentResponse<ElementFlightsResponse> contentResponse = new ContentResponse<>();
        contentResponse.setElements(responseList);

        return contentResponse;
    }
    public ContentResponse<ElementFlightsResponse> findFlightsNow(){
        System.out.println("coooo");
        List<Object[]> flights = flightsRepository.getFlightNow();
        for (Object[] row : flights) {
            System.out.println(Arrays.toString(row));
        }
        List<ElementFlightsResponse> responseList = mapToElementFlightsResponse(flights);
        ContentResponse<ElementFlightsResponse> contentResponse = new ContentResponse<>();
        contentResponse.setElements(responseList);

        return contentResponse;
    }
    public ContentResponse<ElementFlightsResponse> findDestinations(String city) {
        String cityTrimmed = city != null ? city.trim() : "";
        log.info("Fetching destinations for city: " + city);
        List<Object[]> flights = flightsRepository.findDestinations(cityTrimmed);
        if (flights.isEmpty()) {
            log.info("No flights found for city: " + city);
        }
        for (Object[] row : flights) {
            System.out.println(Arrays.toString(row));
        }
        List<ElementFlightsResponse> responseList = mapToElementFlightsResponse(flights);
        ContentResponse<ElementFlightsResponse> contentResponse = new ContentResponse<>();
        contentResponse.setElements(responseList);

        return contentResponse;
    }

    public List<ElementFlightsResponse> mapToElementFlightsResponse(List<Object[]> flights) {

        List<ElementFlightsResponse> responseList = new ArrayList<>();

        for (Object[] flight : flights) {

            // Chuyển đổi departure_time và arrival_time từ java.sql.Date sang LocalDate
            LocalDateTime departureTime = (flight[1] instanceof Timestamp)
                    ? ((Timestamp) flight[1]).toLocalDateTime()
                    : null;

            LocalDateTime arrivalTime = (flight[2] instanceof Timestamp)
                    ? ((Timestamp) flight[2]).toLocalDateTime()
                    : null;

            System.out.println(flight[13].getClass().getName());
            System.out.println(flight[14].getClass().getName());

            // Tạo đối tượng ElementFlightsResponse
            ElementFlightsResponse response = ElementFlightsResponse.builder()
                    .flight_id((Long) flight[0])
                    .departure_time(departureTime)
                    .arrival_time(arrivalTime)
                    .departureAirport(new ElementFlightsResponse.airportRep(
                            (Long) flight[3], (String) flight[4], (String) flight[5], (String) flight[6]))
                    .arrivalAirport(new ElementFlightsResponse.airportRep(
                            (Long) flight[7], (String) flight[8], (String) flight[9], (String) flight[10]))
                    .aircraft(new ElementFlightsResponse.aircraftRep(
                            (Long) flight[11], (String) flight[12]))
//                    .pricing(new Double[]{
//                            flight[12] instanceof Double ? (Double) flight[12] : 0L, // adultPrice
//                            flight[13] instanceof Double ? (Double) flight[13] : 0L  // childPrice
//                    })
                    .remaining_seats(new Long[]{
                            flight[13] instanceof Long ? (Long) flight[13] : 0L, // remainingEconomySeats
                            flight[14] instanceof Long ? (Long) flight[14] : 0L  // remainingBusinessSeats
                    })
                    .economy_pricing(flight[15] instanceof Long ? (Long) flight[15] : 0L)
                    .business_pricing(flight[16] instanceof Long ? (Long) flight[16] : 0L)
                    .build();
            responseList.add(response);
        }
        return responseList;
    }

    public FlightResponse createFlight(FlightCreationRequest request) {

        if (!aircraftsRepository.existsByName(request.getAirplane_name())) {
            throw new MyException(ErrorCode.AIRCRAFT_NOT_EXISTED);
        }

        Aircrafts aircrafts = aircraftsRepository.findByName(request.getAirplane_name());

        Flights flight = flightMapper.toFlight(request);

        flight.setArrival_airport_id(airportsRepository.findByName(request.getArrival_airport()).getId());

        flight.setDeparture_airport_id(airportsRepository.findByName(request.getDeparture_airport()).getId());

        flight.setAirplane_id(aircrafts.getId());
        flight.setFlightCode(generateRandomCode(8));
        flight.setStatus(StatusFlight.READY.name());
        flight.setReason("None");
//        try {
//            flight = flightsRepository.save(flight);
//        } catch (DataIntegrityViolationException e) {
//            throw new MyException(ErrorCode.FLIGHT_EXISTED);
//        }
        flightsRepository.save(flight);
        return flightMapper.toFlightResponse(flight);
    }
    private String generateRandomCode(int length) {
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(chars.length());
            code.append(chars.charAt(index));
        }

        return code.toString();
    }

    public List<HistoryFlightResponse> getFlights() {
        return flightsRepository.getFlightDetails();
    }

    public FlightResponse getFlight(Long id) {
        return flightMapper.toFlightResponse(
                flightsRepository.findById(id).orElseThrow(() -> new MyException(ErrorCode.FLIGHT_NOT_EXISTED)));
    }

    public void deleteFlight(Long flightId) {
        try {
            flightsRepository.deleteById(flightId);
        } catch (DataIntegrityViolationException e) {
            throw new MyException(ErrorCode.FOREIGN_KEY);
        }

        Long nextId = 1L;
        try {
            nextId = getNextId();
            System.out.println(nextId);
        }
        catch (Exception e) {
            nextId = 1L;
        }
        try {
            flightsRepository.resetAutoIncrement(nextId);
        } catch (InvalidDataAccessApiUsageException e) {
            log.info("???");
        }
    }

    private Long getNextId() {
        return flightsRepository.findMaxId() + 1;
    }

    public FlightResponse updateFlight(Long id, FlightUpdateRequest request) {

        Flights flight = flightsRepository.findById(id).orElseThrow(() -> new MyException(ErrorCode.FLIGHT_NOT_EXISTED));

        flightMapper.updateFlight(flight, request);
        return flightMapper.toFlightResponse(flightsRepository.save(flight));

    }

    public List<HistoryBookingFlightResponse> getUserFlightHistory(Long userId) {

        userRepository.findById(userId).orElseThrow(() -> new MyException(ErrorCode.USER_NOT_EXISTED));


        return flightsRepository.getUserFlightHistory(userId);
    }
    public List<HistoryBookingFlightResponse> getUserFlightFuture(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new MyException(ErrorCode.USER_NOT_EXISTED));

        log.info(user.getUsername());
        return flightsRepository.getUserFlightFuture(userId);
    }
    public HistoryFlightResponse searchCode(String code) {
       return flightsRepository.findByFlightCode(code);
    }

}
