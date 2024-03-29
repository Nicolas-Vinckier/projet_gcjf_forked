package com.diginamic.apiback.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diginamic.apiback.config.JWTCookieConfig;
import com.diginamic.apiback.dto.LoginRequestDTO;
import com.diginamic.apiback.models.User;
import com.diginamic.apiback.services.UserService;


@RestController
@RequestMapping("/api")
public class SessionController {
    @Autowired
    private UserService userService;
    @Autowired
    private JWTCookieConfig jwtCookieConfig;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO userLoginDTO) {
        // Authentification
        User user = userService.authenticateUser(userLoginDTO.getEmail(), userLoginDTO.getPassword());
        String cookie = jwtCookieConfig.buildJWTCookie(user);
        if (user != null) {
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie).body(Map.of("token", cookie));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Échec de l'authentification");
        }
    }



}