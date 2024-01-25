package org.backend.web.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.security.Key;
import java.util.Date;

@Slf4j
public class JwtUtil {

    // 보안 강도가 높은 키 생성
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public static String generateJwtToken(String userId, String nickname, String userNm) {
        // 토큰 생성
        String token = Jwts.builder()
                .setSubject(userId)              // 사용자 ID를 토큰의 서브젝트로 설정
                .claim("nickname", nickname)  // 사용자의 닉네임을 추가
                .claim("userNm", userNm)      // 사용자 이름을 추가
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1시간
                .signWith(key)
                .compact();

        return token;
    }

    // 토큰 연장 메서드
    public static ResponseEntity<String> extendTokenExpiration(String token) {
        try {
            // 기존 토큰을 파싱하여 만료 시간을 가져옴
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            Claims claims = claimsJws.getBody();

            // 현재 시간에서 1시간 추가하여 새로운 만료 시간 설정
            Date newExpiration = new Date(System.currentTimeMillis() + 3600000);

            // 토큰의 만료 시간 갱신
            String newToken = Jwts.builder()
                    .setClaims(claims)
                    .setExpiration(newExpiration)
                    .signWith(key)
                    .compact();
            return ResponseEntity.ok(newToken);
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰이 이미 만료되었습니다.");
        } catch (Exception e) {
            log.error("토큰 갱신 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류");
        }
    }
}
