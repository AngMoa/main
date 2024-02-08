package org.backend.web.common.user.controller;

import org.backend.web.jwt.dto.TokenInfo;
import org.backend.web.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Desc     : JWT 연장 Controller
 * @File     : TokenController.java
 * @Author   : SJY
 */
@RestController
public class TokenController {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public TokenController(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * RefreshToken 으로 AccessToken 갱신
     * @param tokenInfo
     * @return tokenInfo
     */
    @PostMapping("/extendAccessTokenExpiration")
    public ResponseEntity<TokenInfo> extendAccessTokenExpiration(@RequestBody TokenInfo tokenInfo) {
        String token = tokenInfo.getRefreshToken();

        return jwtTokenProvider.reissueAccessToken(token);
    }

    /**
     * AccessToken 으로 RefreshToken 갱신
     * @param tokenInfo
     * @return tokenInfo
     */
    @PostMapping("/extendRefreshTokenExpiration")
    public ResponseEntity<TokenInfo> extendRefreshTokenExpiration(@RequestBody TokenInfo tokenInfo) {
        String token = tokenInfo.getAccessToken();

        return jwtTokenProvider.reissueRefreshToken(token);
    }
}
