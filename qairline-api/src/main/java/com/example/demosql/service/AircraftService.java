package com.example.demosql.service;


import com.example.demosql.dto.request.AircraftCreationRequest;
import com.example.demosql.dto.response.AircraftResponse;
import com.example.demosql.entity.Aircrafts;
import com.example.demosql.entity.Manufacturers;
import com.example.demosql.exception.ErrorCode;
import com.example.demosql.exception.MyException;
import com.example.demosql.mapper.AircraftMapper;
import com.example.demosql.mapper.UserMapper;
import com.example.demosql.repository.AircraftsRepository;
import com.example.demosql.repository.FlightsRepository;
import com.example.demosql.repository.ManufactureRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AircraftService {

    AircraftsRepository aircraftsRepository;
    AircraftMapper aircraftMapper;
    ManufactureRepository manufactureRepository;

    public AircraftResponse createAircraft(AircraftCreationRequest request) {
        if( aircraftsRepository.existsByName(request.getName())) {
            throw new MyException(ErrorCode.FLIGHT_EXISTED);
        }
        log.info(request.getYear_of_manufacture().toString());
        Aircrafts aircraft = aircraftMapper.toAircraft(request);

        Manufacturers manufacturer = manufactureRepository.findByName(request.getManufacturer());
        aircraft.setManufacturer_id(manufacturer.getId());
        try{
            aircraft  = aircraftsRepository.save(aircraft);

        }
        catch (DataIntegrityViolationException e ){
            throw  new MyException(ErrorCode.AIRCRAFT_NOT_EXISTED);
        }
        return aircraftMapper.toAircraftResponse(aircraft);
    }


    public void deleteAircraft(Long Id) {
        aircraftsRepository.deleteById(Id);
        Long nextId = 1L;
        try {
            nextId = getNextId();
            System.out.println(nextId);
        }
        catch (Exception e) {
            nextId = 1L;
        }
        try {
            aircraftsRepository.resetAutoIncrement(nextId);
        }
        catch (InvalidDataAccessApiUsageException e) {
            System.err.println("Error getting next ID, using default: " + e.getMessage());
        }
    }

    private Long getNextId() {
        return aircraftsRepository.findMaxId() + 1;
    }

    public List<AircraftResponse> getAircrafts() {
        log.info("In method get Users");
        return aircraftsRepository.findAll().stream().map(aircraftMapper::toAircraftResponse).toList();
    }


}
