package com.example.demosql.mapper;


import com.example.demosql.dto.request.AirportCreationRequest;
import com.example.demosql.dto.response.AirportsResponse;
import com.example.demosql.entity.Airports;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AirportsMapper {
    Airports toAirport(AirportCreationRequest request);
    AirportsResponse toAirportsResponse(Airports airport);
    //void updateAircraft(@MappingTarget Aircrafts aircraft, AircraftUpdateRequest request);
}
