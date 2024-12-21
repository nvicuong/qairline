package com.example.demosql.mapper;

import com.example.demosql.dto.request.AircraftCreationRequest;
import com.example.demosql.dto.request.NewCreationRequest;
import com.example.demosql.dto.response.AircraftResponse;
import com.example.demosql.dto.response.NewsResponse;
import com.example.demosql.entity.Aircrafts;
import com.example.demosql.entity.News;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NewMapper {
    News toNew(NewCreationRequest request);
    NewsResponse toNewResponse(News news);
    //void updateAircraft(@MappingTarget Aircrafts aircraft, AircraftUpdateRequest request);
}
