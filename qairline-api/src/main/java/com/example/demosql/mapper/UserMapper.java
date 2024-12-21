package com.example.demosql.mapper;

import com.example.demosql.dto.request.UserCreationRequest;
import com.example.demosql.dto.request.UserUpdateRequest;
import com.example.demosql.dto.response.UserResponse;
import com.example.demosql.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);
    UserResponse toUserResponse(User user);
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
