package com.example.demosql.service;


import com.example.demosql.dto.request.AircraftCreationRequest;
import com.example.demosql.dto.request.NewCreationRequest;
import com.example.demosql.dto.response.AircraftResponse;
import com.example.demosql.dto.response.NewsResponse;
import com.example.demosql.entity.Aircrafts;
import com.example.demosql.entity.Manufacturers;
import com.example.demosql.entity.News;
import com.example.demosql.enums.TypeNew;
import com.example.demosql.exception.ErrorCode;
import com.example.demosql.exception.MyException;
import com.example.demosql.mapper.AircraftMapper;
import com.example.demosql.mapper.NewMapper;
import com.example.demosql.repository.AircraftsRepository;
import com.example.demosql.repository.ManufactureRepository;
import com.example.demosql.repository.NewsRepository;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
//@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class NewService {

    @Value("${image.path}")
    private String imagePrefixPath;

    final NewsRepository newsRepository;
    final NewMapper newMapper;

    private static final String NEWS_IMAGE_DIRECTORY = "/images/news/";

    public NewsResponse createNews(NewCreationRequest request ,  MultipartFile image) {

        try {
            String imagePath = saveImage(image);
            News news  = new News();
            news.setTitle(request.getTitle());
            news.setType(request.getType());
            news.setContent(request.getContent());
            news.setImage(imagePath);
            String type = request.getType();

            TypeNew typeEnum = TypeNew.valueOf(type.toUpperCase());
            news.setType(typeEnum.name());
            news.setCreated_at(LocalDateTime.now());

            newsRepository.save(news);
            return newMapper.toNewResponse(news);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }
    private String saveImage(MultipartFile image) throws IOException {

        String directory = imagePrefixPath + NEWS_IMAGE_DIRECTORY;
        File dir = new File(directory);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        String originalFilename = image.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = System.currentTimeMillis() + fileExtension;

        Path filePath = Paths.get(directory, uniqueFilename);

        Files.write(filePath, image.getBytes());

        return "/images/news/" + uniqueFilename;
    }


    public void deleteNew(Long Id) {
        Optional<News> newsOptional = newsRepository.findById(Id);
        if (newsOptional.isPresent()) {
            News news = newsOptional.get();

            String imagePath = news.getImage();
            if (imagePath != null && !imagePath.isEmpty()) {
                File imageFile = new File(imagePath);
                if (imageFile.exists() && imageFile.isFile()) {
                    if (imageFile.delete()) {
                        log.info("Ảnh đã được xóa: " + imagePath);
                    } else {
                        log.warn("Không thể xóa ảnh: " + imagePath);
                    }
                }
            }
        }
        newsRepository.deleteById(Id);
        Long nextId = 1L;
        try {
            nextId = getNextId();
            System.out.println(nextId);
        }
        catch (Exception e) {
            nextId = 1L;
        }
        try {
            newsRepository.resetAutoIncrement(nextId);
        }
        catch (InvalidDataAccessApiUsageException e) {
            log.info("vl");
        }
    }

    private Long getNextId() {
        return newsRepository.findMaxId() + 1;
    }

    public List<NewsResponse> getNews() {
        log.info("In method get Users");
        return newsRepository.findAll().stream().map(newMapper::toNewResponse).toList();
    }
    public NewsResponse getNew(Long Id) {
        return newMapper.toNewResponse(
                newsRepository.findById(Id).orElseThrow(() -> new MyException(ErrorCode.NEW_NOT_EXISTED)));
    }


}
