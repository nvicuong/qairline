package com.example.demosql.mapper;

import com.example.demosql.dto.request.FlightCreationRequest;
import com.example.demosql.dto.request.FlightUpdateRequest;
import com.example.demosql.dto.response.FlightResponse;
import com.example.demosql.entity.Flights;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FlightMapper {
    Flights toFlight(FlightCreationRequest request);
    FlightResponse toFlightResponse(Flights flight);
    void updateFlight(@MappingTarget Flights fLight, FlightUpdateRequest request);
}
