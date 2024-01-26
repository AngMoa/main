package org.backend.web.common.user.controller;

import org.backend.web.jwt.dto.TokenInfo;
import org.backend.web.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public TokenController(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // 토큰 만료시간 1시간 연장
    @PostMapping("/extendTokenExpiration")
    public ResponseEntity<String> extendTokenExpiration(@RequestBody TokenInfo tokenInfo) {
        String token = tokenInfo.getAccessToken();
        return jwtTokenProvider.extendTokenExpiration(token);
    }
}
