package org.backend.web.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    public static String generateJwtToken(String userId, String nickname, String userNm) {
        // 보안 강도가 높은 키 생성
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

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
}
