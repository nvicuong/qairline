package com.example.demosql.service;


import com.example.demosql.dto.request.NewCreationRequest;
import com.example.demosql.dto.response.NewsResponse;
import com.example.demosql.entity.News;
import com.example.demosql.enums.TypeNew;
import com.example.demosql.mapper.NewMapper;
import com.example.demosql.repository.ManufacturesRepository;
import com.example.demosql.repository.NewsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ManufacturesService {


    ManufacturesRepository manufacturesRepository;
    public void deleteManufacture(Long Id) {

        manufacturesRepository.deleteById(Id);
        Long nextId = 1L;
        try {
            nextId = getNextId();
            System.out.println(nextId);
        }
        catch (Exception e) {
            nextId = 1L;
        }
        try {
           manufacturesRepository.resetAutoIncrement(nextId);
        }
        catch (InvalidDataAccessApiUsageException e) {
            log.info("vl");
        }
    }

    private Long getNextId() {
        return manufacturesRepository.findMaxId() + 1;
    }



}
