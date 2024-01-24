package org.backend.web.common.user.controller;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Key;
import java.util.Date;

@RestController
public class TokenController {

    // 보안 강도가 높은 키 생성
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    // 토큰 만료시간 1시간 연장
    @PostMapping("/extendTokenExpiration")
    public ResponseEntity<String> extendTokenExpiration(@RequestBody String token) {
        try {
            // 기존 토큰을 파싱하여 만료 시간을 가져옴
            Date expiration = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();

            // 현재 시간에서 1시간 추가하여 새로운 만료 시간 설정
            Date newExpiration = new Date(System.currentTimeMillis() + 3600000);

            // 토큰의 만료 시간 갱신
            String newToken = Jwts.builder()
                    .setExpiration(newExpiration)
                    .signWith(key)
                    .compact();

            return ResponseEntity.ok(newToken);
        } catch (ExpiredJwtException e) {
            // 토큰이 만료된 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰이 이미 만료되었습니다.");
        } catch (Exception e) {
            // 그 외 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류");
        }
    }
}
