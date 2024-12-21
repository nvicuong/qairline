package com.example.demosql.controller;

import com.example.demosql.dto.request.AircraftCreationRequest;
import com.example.demosql.dto.request.NewCreationRequest;
import com.example.demosql.dto.response.AircraftResponse;
import com.example.demosql.dto.response.ApiResponse;
import com.example.demosql.dto.response.NewsResponse;
import com.example.demosql.service.AircraftService;
import com.example.demosql.service.NewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("news")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class NewsController {
    NewService newService;





    @PostMapping(value = "/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<NewsResponse> createAircraft(@RequestPart("json") NewCreationRequest request,
                                             @RequestPart("image") MultipartFile image) {
        ApiResponse<NewsResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(newService.createNews(request , image));
        return apiResponse;
    }
    @GetMapping("/getAll")
    ApiResponse<List<NewsResponse>> getNews() {
        return ApiResponse.<List<NewsResponse>>builder()
                .result(newService.getNews())
                .build();
    }
    @DeleteMapping("/delete/{newId}")
    ApiResponse<String> deleteAircraft(@PathVariable Long newId) {
        //System.out.println("con meo");
        newService.deleteNew(newId);
        return ApiResponse.<String>builder().result("New has been deleted").build();
    }
    @GetMapping("/get/{Id}")
    ApiResponse<NewsResponse> getNew(@PathVariable Long Id) {
        return ApiResponse.<NewsResponse>builder()
                .result(newService.getNew(Id))
                .build();
    }

}
