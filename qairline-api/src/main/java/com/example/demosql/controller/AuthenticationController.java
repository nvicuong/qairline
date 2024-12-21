package com.example.demosql.controller;

import com.example.demosql.dto.request.*;
import com.example.demosql.dto.response.ApiResponse;
import com.example.demosql.dto.response.AuthenticationResponse;
import com.example.demosql.dto.response.IntrospectResponse;
import com.example.demosql.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)

public class AuthenticationController {
    AuthenticationService authenticationServer;

    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationServer.authentication(request);

        return ApiResponse.<AuthenticationResponse>builder()
                .code(1000)
                .status(true)
                .result(result)
                .build();
    }
    @PostMapping("/check")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationServer.introspect(request);

        return ApiResponse.<IntrospectResponse>builder()
                .code(1000)
                .status(true)
                .result(result)
                .build();
    }
    @PostMapping("/logout")
    ApiResponse<Void> logOut(@RequestBody LogOutRequest request) throws ParseException, JOSEException {
        authenticationServer.logOut(request);

        return ApiResponse.<Void>builder()
                .code(1000)
                .status(true)
                .build();
    }
    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody RefreshRequest request) throws ParseException, JOSEException {
        var result = authenticationServer.refreshToken(request);

        return ApiResponse.<AuthenticationResponse>builder()
                .code(1000)
                .status(true)
                .result(result)
                .build();
    }
}
