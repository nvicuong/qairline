package com.example.demosql.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {ValidDob.class}
)
public @interface DobValidate {
    String message() default "{invalid date of birth}";
    int min();
    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
