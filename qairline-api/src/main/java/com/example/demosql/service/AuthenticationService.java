package com.example.demosql.service;

import com.example.demosql.dto.request.AuthenticationRequest;
import com.example.demosql.dto.request.IntrospectRequest;
import com.example.demosql.dto.request.LogOutRequest;
import com.example.demosql.dto.request.RefreshRequest;
import com.example.demosql.dto.response.AuthenticationResponse;
import com.example.demosql.dto.response.IntrospectResponse;
import com.example.demosql.entity.InvalidatedToken;
import com.example.demosql.entity.User;
import com.example.demosql.exception.ErrorCode;
import com.example.demosql.exception.MyException;
import com.example.demosql.repository.InvalidatedTokenRepository;
import com.example.demosql.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE ,makeFinal = true)
@Slf4j

public class AuthenticationService {
    UserRepository userRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;


    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException , ParseException {
        var token = request.getToken();
        boolean isValid = true ;
        try {
            verifyToken(token ,false    );
        }
        catch (MyException e) {
            isValid = false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .build();

    }
    public AuthenticationResponse authentication(AuthenticationRequest request) {
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new MyException(ErrorCode.USER_NOT_EXISTED)) ;
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(5);
        boolean authenticated =  passwordEncoder.matches(request.getPassword(), user.getPassword());

        if(!authenticated) {
            throw  new MyException(ErrorCode.UNAUTHENTICATED);
        }
        var token = generationToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }
    private String generationToken(User user){
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);//thuat toan
        JWTClaimsSet  jwtClaimsSet = new JWTClaimsSet.Builder() // payload
                .subject(user.getUsername())
                .issuer("MyAuthService") // do ai phat hanh token nay
                .issueTime(new Date())
                .jwtID(UUID.randomUUID().toString())
                .claim("scope",buildScope(user))
                .expirationTime(new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader ,payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();

        }
        catch (JOSEException e) {

            log.error("ko the tao token" ,e);
            throw new RuntimeException(e);
        }
    }
    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        stringJoiner.add(user.getRole());
        return stringJoiner.toString();
    }

    public void logOut(LogOutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken() , true) ;
            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jit)
                    .expiryTime(expiryTime)
                    .build();
            invalidatedTokenRepository.save(invalidatedToken);
        }
        catch (MyException e) {
            log.info("Token da het han");
        }
    }

    private SignedJWT verifyToken(String token , boolean isRefresh ) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime  =  (isRefresh)
                ? new Date( signedJWT.getJWTClaimsSet().getIssueTime().toInstant()
                    .plus(REFRESHABLE_DURATION,ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if(!verified && expiryTime.after(new Date())){
            throw new MyException(ErrorCode.UNAUTHENTICATED);
        }
        if( invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
            throw new MyException(ErrorCode.UNAUTHENTICATED);
        }
        return signedJWT;
    }
    public AuthenticationResponse refreshToken( RefreshRequest request) throws ParseException, JOSEException {

        var signJWT = verifyToken(request.getToken() ,true);

        var jit = signJWT.getJWTClaimsSet().getJWTID();

        var expiryTime = signJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();
        invalidatedTokenRepository.save(invalidatedToken);

        var username = signJWT.getJWTClaimsSet().getSubject();

        var user = userRepository.findByUsername(username).orElseThrow(() ->
                 new MyException(ErrorCode.UNAUTHENTICATED)
        );

        var token = generationToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }


}

