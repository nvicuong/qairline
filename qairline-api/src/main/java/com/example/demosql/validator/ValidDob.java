package com.example.demosql.validator;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

public class ValidDob implements ConstraintValidator<DobValidate , LocalDate> {

    private  int minAge;
    @Override
    public boolean isValid(LocalDate localDate, ConstraintValidatorContext constraintValidatorContext) {
        if(Objects.isNull(localDate)) {
            return true;
        }
        long years = ChronoUnit.YEARS.between(localDate,LocalDate.now());

        return years >= minAge;
    }

    @Override
    public void initialize(DobValidate constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        minAge = constraintAnnotation.min();
    }
}
