package com.example.demosql.service;

import com.example.demosql.dto.request.UserCreationRequest;
import com.example.demosql.dto.request.UserUpdatePasswordRequest;
import com.example.demosql.dto.request.UserUpdateRequest;
import com.example.demosql.dto.response.UserResponse;
import com.example.demosql.entity.User;
import com.example.demosql.enums.Role;
import com.example.demosql.exception.ErrorCode;
import com.example.demosql.exception.MyException;
import com.example.demosql.mapper.UserMapper;
import com.example.demosql.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;

    public UserResponse createUser(UserCreationRequest request) {
        if( userRepository.existsByUsername(request.getUsername())) {
            throw new MyException(ErrorCode.USER_EXISTED);
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        String role = Role.USER.name();
        user.setRole(role);
        try{
            user  = userRepository.save(user);

        }
        catch (DataIntegrityViolationException e ){
            throw  new MyException(ErrorCode.USER_EXISTED);
        }
        return userMapper.toUserResponse(user);
    }

    // thi em cung co de quyen truy cap update dau :))
    public UserResponse updateUser(Long  userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new MyException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void updatePasswordUser(Long userId, UserUpdatePasswordRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new MyException(ErrorCode.USER_NOT_EXISTED));

        String oldPassword = user.getPassword();

        if (!passwordEncoder.matches(request.getOld_password(), oldPassword)) {
            throw new MyException(ErrorCode.PASSWORD_INVALID); // Báo lỗi nếu mật khẩu không khớp
        }

        user.setPassword(passwordEncoder.encode(request.getNew_password()));

        userRepository.save(user);
    }
    // cai duoi nhu nay moi la can truy cap
    //@PreAuthorize("hasAuthority('ADMIN')") nếu muốn dùng permission
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
        Long nextId = 1L;
        try {
            nextId = getNextId();
            System.out.println(nextId);
        }
        catch (Exception e) {
            nextId = 1L;
        }
        try {
            userRepository.resetAutoIncrement(nextId);
        }
        catch (InvalidDataAccessApiUsageException e) {
            log.info("vl");
        }
    }

    private Long getNextId() {
        return userRepository.findMaxId() + 1;
    }
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        log.info("In method get Users");
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse getUser(Long id) {
        return userMapper.toUserResponse(
                userRepository.findById(id).orElseThrow(() -> new MyException(ErrorCode.USER_NOT_EXISTED)));
    }
    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name).orElseThrow(() -> new MyException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }
}
