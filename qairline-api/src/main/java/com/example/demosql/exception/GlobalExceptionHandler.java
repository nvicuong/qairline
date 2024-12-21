package com.example.demosql.exception;

import com.example.demosql.dto.response.ApiResponse;
import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;
import java.util.Objects;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private static final String MIN_ATTRIBUTE = "min";
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse > handlingRuntimeException(RuntimeException exception) {

        log.error("Exception: ", exception);
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }
    @ExceptionHandler(value = MyException.class)
    ResponseEntity<ApiResponse > handlingMyException(MyException exception) {

        ErrorCode errorCode = exception.getErrorCode();

        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setStatus(false);
        apiResponse.setMessage(errorCode.getMessage());
        apiResponse.setCode(errorCode.getCode());


        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);
    }
    @ExceptionHandler(value =  MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception) {
        String enumKey = exception.getFieldError().getDefaultMessage();

        ErrorCode errorCode = ErrorCode.INVALID_KEY;

        Map<String ,Object> attributes = null;
        try {
            errorCode = ErrorCode.valueOf(enumKey);

            var constrainViolation = exception.getBindingResult()
                    .getAllErrors().getFirst().unwrap(ConstraintViolation.class);

            attributes = constrainViolation.getConstraintDescriptor().getAttributes();
            log.info(attributes.toString());
        }
        catch (IllegalArgumentException e){

        }
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setStatus(false);
        apiResponse.setMessage(Objects.nonNull(attributes)?
                mapAttribute(errorCode.getMessage() , attributes ) :
                errorCode.getMessage());
        apiResponse.setCode(errorCode.getCode());

        return ResponseEntity.badRequest().body(apiResponse);
    }
    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException exception) {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;


        return ResponseEntity.status(errorCode.getStatusCode()).body(
                ApiResponse.builder()
                        .status(false)
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build()
                );
    }
    private String mapAttribute(String message , Map<String,Object> attributes) {
        String minValue =  String.valueOf(attributes.get(MIN_ATTRIBUTE));

        return message.replace("{" + MIN_ATTRIBUTE + "}" , minValue);
    }


}
