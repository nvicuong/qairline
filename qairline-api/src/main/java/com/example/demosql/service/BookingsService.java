package com.example.demosql.service;

import com.example.demosql.dto.request.AirportCreationRequest;
import com.example.demosql.dto.request.BookingCreationRequest;
import com.example.demosql.dto.request.UserCreationRequest;
import com.example.demosql.dto.response.*;
import com.example.demosql.entity.*;
import com.example.demosql.enums.PaymentMethod;
import com.example.demosql.enums.PaymentStatus;
import com.example.demosql.enums.Role;
import com.example.demosql.exception.ErrorCode;
import com.example.demosql.exception.MyException;
import com.example.demosql.mapper.AirportsMapper;
import com.example.demosql.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BookingsService {
    BookingsRepository bookingsRepository;
    TicketsRepository ticketsRepository;
    FlightsRepository flightsRepository;
    PaymentsRepository paymentsRepository;

    public List<BookingResponse> getAirports() {
        List<Map<String, Object>> response = bookingsRepository.findAllBookingDetails();
        return convertToBookingResponse(response);
    }

    private List<BookingResponse> convertToBookingResponse(List<Map<String, Object>> bookingDetails) {
        List<BookingResponse> responseList = new ArrayList<>();

        for (Map<String, Object> booking : bookingDetails) {
            BookingResponse response = new BookingResponse();

            Timestamp createdAt = (Timestamp) booking.get("createdAt");
            Timestamp updatedAt = (Timestamp) booking.get("updatedAt");

            LocalDateTime createdLocalDate = createdAt.toLocalDateTime();
            LocalDateTime updatedLocalDate = updatedAt.toLocalDateTime();


            response.setId((Long) booking.get("bookingId"));
            response.setName((String) booking.get("fullName"));
            response.setStatus((String) booking.get("status"));
            response.setFlight_code((String) booking.get("airplaneName"));
            response.setNum_tickets(((BigDecimal) booking.get("ticketCount")).longValue());
            response.setPrice((Double) booking.get("totalPricing"));
            response.setCreated_at(createdLocalDate);
            response.setUpdate_at(updatedLocalDate); // Bạn có thể thay thế bằng giá trị thực tế

            responseList.add(response);
        }

        return responseList;
    }

    public void deleteBooking(Long bookingId) {


        List<Tickets> tickets = ticketsRepository.findByBookingId(bookingId);

        for (Tickets ticket : tickets) {

            Optional<Flights> optionalFlight = flightsRepository.findById(ticket.getFlight_id());

            if (optionalFlight.isPresent()) {
                Flights flight = optionalFlight.get();


                if ("economy".equals(ticket.getSeat_class())) {
                    flight.setRemain_economy_seat(flight.getRemain_economy_seat() + ticket.getNum());
                } else if ("business".equals(ticket.getSeat_class())) {
                    flight.setRemain_business_seat(flight.getRemain_business_seat() + ticket.getNum());
                }


                flightsRepository.save(flight);
            }
        }

        Optional<Bookings> optionalBooking = bookingsRepository.findById(bookingId);

        if (optionalBooking.isPresent()) {
            Bookings booking = optionalBooking.get();  // Lấy đối tượng booking


            booking.setStatus(PaymentStatus.CANCEL.name());

            bookingsRepository.save(booking);

        } else {
            System.out.println("Booking not found.");
        }
        Long nextIdTicket = 1L;
        try {
            nextIdTicket = getNextIdTicket();
        }
        catch (Exception e) {
            nextIdTicket = 1L;
        }
        try {
            ticketsRepository.resetAutoIncrement(nextIdTicket);
        } catch (InvalidDataAccessApiUsageException e) {
            log.info("vl");
        }
    }

    private Long getNextIdBook() {
        return bookingsRepository.findMaxId() + 1;
    }
    private Long getNextIdTicket() {
        return ticketsRepository.findMaxId() + 1;
    }

    public BookingResponse createBooking(BookingCreationRequest request) {

        Bookings bookings = createAndSaveBooking(request);

        // Create tickets for adults and children
        if (request.getNum_ticket_adult() > 0) {
            createAndSaveTickets(bookings.getId(), request, "adult", request.getNum_ticket_adult(), request.getPrice());
        }

        if (request.getNum_ticket_child() > 0) {
            createAndSaveTickets(bookings.getId(), request, "child", request.getNum_ticket_child(), request.getPrice() * 0.5);
        }

        createPayments(bookings, request);

        // Update flight information
        updateFlightIfExists(request);

        // Return response
        return bookingsRepository.toBookingResponse(bookings.getId());
    }
    private void createPayments(Bookings bookings , BookingCreationRequest request) {
        Payments payments = new Payments();

        payments.setBooking_id(bookings.getId());
        payments.setPayment_amount(bookings.getPrice());
        payments.setPayment_date(bookings.getCreated_at());
        payments.setPayment_status(PaymentStatus.SUCCESS.name());
        payments.setPayment_method(PaymentMethod.BANK.name());

        paymentsRepository.save(payments);

    }
    private Bookings createAndSaveBooking(BookingCreationRequest request) {
        Bookings bookings = new Bookings();
        bookings.setUser_id(request.getUser_id());
        bookings.setCreated_at(request.getCreated_at());
        bookings.setUpdated_at(request.getUpdated_at());
        bookings.setPrice(calculateTotalPrice(request));
        bookings.setStatus(PaymentStatus.SUCCESS.name());
        bookingsRepository.save(bookings);
        return bookings;
    }

    private double calculateTotalPrice(BookingCreationRequest request) {
        return request.getPrice() * request.getNum_ticket_adult()
                + request.getNum_ticket_child() * request.getPrice() * 0.5;
    }

    private void createAndSaveTickets(Long bookingId, BookingCreationRequest request, String seatType, Long numTickets, double pricing) {
        Tickets tickets = new Tickets();
        tickets.setBooking_id(bookingId);
        tickets.setFlight_id(request.getFlight_id());
        tickets.setSeat_class(request.getStyle_class());
        tickets.setSeat_type(seatType);
        tickets.setNum(numTickets);
        tickets.setPricing(pricing);
        tickets.setCreated_at(request.getCreated_at());
        tickets.setUpdated_at(request.getUpdated_at());
        ticketsRepository.save(tickets);
    }

    private void updateFlightIfExists(BookingCreationRequest request) {
        flightsRepository.findById(request.getFlight_id()).ifPresent(flight -> {
            updateFlights(request, flight);
            flightsRepository.save(flight);
        });
    }

    private void updateFlights(BookingCreationRequest request, Flights flight) {
        if (Objects.equals(request.getStyle_class(), "economy")) {
            flight.setRemain_economy_seat(flight.getRemain_economy_seat() -
                    request.getNum_ticket_child() - request.getNum_ticket_adult());
        } else if (Objects.equals(request.getStyle_class(), "business")) {
            flight.setRemain_business_seat(flight.getRemain_business_seat() -
                    request.getNum_ticket_child() - request.getNum_ticket_adult());
        }
    }
}
