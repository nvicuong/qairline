package com.example.demosql.configuration;

import com.example.demosql.entity.User;
import com.example.demosql.enums.Role;
import com.example.demosql.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitCọnfig {

    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                var role = Role.ADMIN.name();
                User user = User.builder()
                        .username("admin")
                        .full_name("admin")
                        .password(passwordEncoder.encode("admin"))
                        .role(role)
                        .birthday( LocalDate.now())
                        .address("Default Address")
                        .phone_number("0000000000")
                        .build();
                userRepository.save(user);
                log.warn("admin da dc khoi tao");
            }

        };
    }
}
