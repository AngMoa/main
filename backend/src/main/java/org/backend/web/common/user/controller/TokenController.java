package org.backend.web.common.user.controller;

import org.backend.web.common.user.dto.TokenDto;
import org.backend.web.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {

    // 토큰 만료시간 1시간 연장
    @PostMapping("/extendTokenExpiration")
    public ResponseEntity<String> extendTokenExpiration(@RequestBody TokenDto tokenDto) {
        String token = tokenDto.getToken();
        return JwtUtil.extendTokenExpiration(token);
    }
}
