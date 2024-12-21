package com.example.demosql.controller;

import com.example.demosql.dto.request.UserUpdatePasswordRequest;
import com.example.demosql.dto.response.ApiResponse;
import com.example.demosql.dto.request.UserCreationRequest;
import com.example.demosql.dto.request.UserUpdateRequest;
import com.example.demosql.dto.response.UserResponse;
import com.example.demosql.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/accounts")

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserController {

    UserService userService;

    @PostMapping("/signup")
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }

    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("Username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getUsers())
                .build();
    }

    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable("userId") Long userId) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUser(userId))
                .build();
    }

    @DeleteMapping("/delete/{userId}")
    ApiResponse<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ApiResponse.<String>builder().result("User has been deleted").build();
    }

    @PutMapping("/update/{userId}")
    ApiResponse<UserResponse> updateUser(@PathVariable Long userId, @RequestBody @Valid UserUpdateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(userId, request))
                .build();
    }
    @PutMapping("/change/{userId}")
    ApiResponse<String> updatePasswordUser(@PathVariable Long userId, @RequestBody @Valid UserUpdatePasswordRequest request) {
        userService.updatePasswordUser(userId, request);
        return ApiResponse.<String>builder()
                .result("Update password successful")
                .build();
    }

    @GetMapping("/myInfo")
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

}

