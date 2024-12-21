package com.example.demosql.service;

import com.example.demosql.dto.request.AirportCreationRequest;
import com.example.demosql.dto.request.UserCreationRequest;
import com.example.demosql.dto.response.AirportsResponse;
import com.example.demosql.dto.response.ContentResponse;
import com.example.demosql.dto.response.ElementDestinationsResponse;
import com.example.demosql.dto.response.UserResponse;
import com.example.demosql.entity.Airports;
import com.example.demosql.entity.News;
import com.example.demosql.entity.User;
import com.example.demosql.enums.Role;
import com.example.demosql.enums.TypeNew;
import com.example.demosql.exception.ErrorCode;
import com.example.demosql.exception.MyException;
import com.example.demosql.mapper.AirportsMapper;
import com.example.demosql.repository.AirportsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AirportsService {

    AirportsRepository airportsRepository;
    AirportsMapper airportsMapper;

    public ContentResponse <ElementDestinationsResponse> getDestinations(String country, int numberPerPage, int currentPage) {
        int offset = (currentPage - 1) * numberPerPage;
        List<ElementDestinationsResponse> elements = convertToElementResponse(airportsRepository
                .findDestinations(country, numberPerPage, offset));
        long totalElements = airportsRepository.count();
        int numberOfPages = (int) Math.ceil((double) totalElements / numberPerPage);

        ContentResponse<ElementDestinationsResponse> destinationResponse =
                new ContentResponse<>();

        destinationResponse.setNumber_of_page(String.valueOf(numberOfPages));
        destinationResponse.setNumber_per_page(String.valueOf(numberPerPage));
        destinationResponse.setCurrent_page(String.valueOf(currentPage));
        destinationResponse.setElements(elements);

        return destinationResponse;
    }
    public List<ElementDestinationsResponse> convertToElementResponse(List<Map<String, Object>> destinations) {
        List<ElementDestinationsResponse> responseList = new ArrayList<>();
        for (Map<String, Object> destination : destinations) {
            String cityName = (String) destination.get("cityName");
            String countryName = (String) destination.get("countryName");
            String imageLink = (String) destination.get("imageLink");
            responseList.add(new ElementDestinationsResponse(cityName, countryName, imageLink));
        }
        return responseList;
    }
    public  List<AirportsResponse> getAirports () {
        return airportsRepository.findAll().stream().map(airportsMapper::toAirportsResponse).toList();
    }
    public AirportsResponse createAirport(AirportCreationRequest request, MultipartFile image) {
        if( airportsRepository.existsByName(request.getName())) {
            throw new MyException(ErrorCode.AIRPORT_EXISTED);
        }
        try {
            String imagePath = saveImage(image);
            Airports airport = airportsMapper.toAirport(request);
            airport.setLink(imagePath);
            airportsRepository.save(airport);
            return airportsMapper.toAirportsResponse(airport);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }

    }
    private String saveImage(MultipartFile image) throws IOException {

        String directory = "src/main/resources/images/airports";
        File dir = new File(directory);

        // Tạo thư mục nếu chưa tồn tại
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String originalFilename = image.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = System.currentTimeMillis() + fileExtension;

        // Đường dẫn file đầy đủ
        Path filePath = Paths.get(directory, uniqueFilename);

        // Lưu file vào hệ thống
        Files.write(filePath, image.getBytes());

        // Trả về đường dẫn file
        String baseUrl = System.getenv("BASE_URL");
        if (baseUrl == null) {
            baseUrl = "http://localhost:8080/qairline";
        }
        return baseUrl + "/images/airport/" + uniqueFilename;
    }

    public void deleteAirport(Long Id) {
        airportsRepository.deleteById(Id);
        Long nextId = 1L;
        try {
            nextId = getNextId();
            System.out.println(nextId);
        }
        catch (Exception e) {
            nextId = 1L;
        }
        try {
            airportsRepository.resetAutoIncrement(nextId);
        }
        catch (InvalidDataAccessApiUsageException e) {
            log.info("vl");
        }
    }

    private Long getNextId() {
        return airportsRepository.findMaxId() + 1;
    }


}
