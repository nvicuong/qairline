package com.example.demosql.mapper;

import com.example.demosql.dto.request.AircraftCreationRequest;
import com.example.demosql.dto.response.AircraftResponse;
import com.example.demosql.entity.Aircrafts;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AircraftMapper {
    Aircrafts toAircraft(AircraftCreationRequest request);
    AircraftResponse toAircraftResponse(Aircrafts aircraft);
    //void updateAircraft(@MappingTarget Aircrafts aircraft, AircraftUpdateRequest request);
}
