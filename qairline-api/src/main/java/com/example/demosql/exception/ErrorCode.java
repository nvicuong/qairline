package com.example.demosql.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_PHONE_NUMBER(1009,"Your phone number must be at least {min}",HttpStatus.BAD_REQUEST),
    FLIGHT_EXISTED(1010,"Flight existed",HttpStatus.BAD_REQUEST),
    FLIGHT_NOT_EXISTED(1010,"Flight not existed",HttpStatus.BAD_REQUEST),
    AIRCRAFT_NOT_EXISTED(1010,"Aircraft not existed",HttpStatus.BAD_REQUEST),
    FOREIGN_KEY(1011,"Không thể xóa khóa ngoại " , HttpStatus.BAD_REQUEST),
    AIRPORT_EXISTED(1012,"San bay ton tai ro nhe" ,HttpStatus.BAD_REQUEST ),
    PASSWORD_INVALID(1013,"Password ko dung nhe",HttpStatus.BAD_REQUEST),
    NEW_NOT_EXISTED(1014,"New khong ton tai" ,HttpStatus.BAD_REQUEST );

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}