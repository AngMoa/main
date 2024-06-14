package org.backend.web.common.user.controller;

import lombok.extern.slf4j.Slf4j;
import org.backend.web.common.user.service.UserService;
import org.backend.web.jwt.dto.TokenInfo;
import org.backend.web.util.ClientUtils;
import org.backend.web.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Desc     : 사용자 관련 Controller
 * @File     : UserController.java
 * @Author   : SJY
 */
@Slf4j
@ResponseBody
@RestController
@RequestMapping("/com")
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @Autowired
    private ImageUtil imageUtil;

    /**
     * 로그인
     * @param loginMap (userId, password)
     * @return ResponseEntity.ok(tokenInfo)
     */
    @PostMapping(value = "/login")
    public ResponseEntity<TokenInfo> login(@RequestBody Map<String, String> loginMap, HttpServletRequest httpRequest) {
        String userId = loginMap.get("userId");
        String enteredPassword = loginMap.get("password");
        String ip = ClientUtils.getRemoteIP(httpRequest);

        // 암호화된 패스워드
        String storedPasswordHash = userService.getUserPassword(userId);

        // 입력된 비밀번호, 암호화된 비밀번호 비교
        boolean passwordMatches = passwordEncoder.matches(enteredPassword, storedPasswordHash);

        // 로그인 로그 생성
        Map<String, String> logMap = createLoginLogMap(ip, userId, passwordMatches);
        userService.loginLog(logMap);

        if (passwordMatches) {
            TokenInfo tokenInfo = userService.login(userId, storedPasswordHash);

            // 로그인 실패 횟수 초기화
            userService.loginSuccess(userId);

            // 로그인 성공 시 토큰 반환
            return ResponseEntity.ok(tokenInfo);
        } else {
            userService.loginFail(userId);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    /**
     * 로그인 로그
     * @param ip, userId, passwordMatches
     * @return logMap
     */
    private Map<String, String> createLoginLogMap(String ip, String userId, boolean passwordMatches) {
        Map<String, String> logMap = new HashMap<>();
        logMap.put("ip", ip);
        logMap.put("loginYn", passwordMatches ? "Y" : "N");
        logMap.put("userId", userId);
        return logMap;
    }

    /**
     * id 중복체크, id 확인이 필요한 경우
     * @param idCheckMap
     * @return 1 (id 존재), 0 (id 부재)
     */
    @PostMapping(value = "/idCheck")
    public List<Map<String, Object>> idCheck(@RequestBody Map<String, String> idCheckMap) {
        return userService.idCheck(idCheckMap);
    }

    /**
     * 회원가입
     * @param userDetailList
     * @return totalJoinedUsers
     */
    @PostMapping("/join")
    public int join(@RequestParam(name = "file", required = false) MultipartFile file,
                    @RequestBody List<Map<String, String>> userDetailList) {
        int totalJoinedUsers = 0;

        for (Map<String, String> userDetail : userDetailList) {
            String password = userDetail.get("password");

            // 비밀번호 암호화
            String hashedPassword = passwordEncoder.encode(password);

            // 암호화된 비밀번호로 저장
            userDetail.put("password", hashedPassword);

            if(file != null && !file.isEmpty()) {
                // 이미지 파일 저장
                String imageNm = imageUtil.saveFile(file);
                // 이미지 루트 저장
                userDetail.put("imageNm", imageNm);
            }

            totalJoinedUsers += userService.join(userDetail);
        }

        return totalJoinedUsers;
    }

    /**
     * 아이디 찾기
     * @param findIdMap
     * @return USER_ID
     */
    @PostMapping("/findId")
    public List<Map<String, Object>> findId(@RequestBody Map<String, String> findIdMap) {
        String userNm = findIdMap.get("userNm");
        String userEmail = findIdMap.get("userEmail");
        return userService.findId(userNm, userEmail);
    }

    /**
     * 비밀번호 찾기
     * @param findPwMap
     * @return findPwList
     */
    @PostMapping("/findPw")
    public List<Map<String, Object>> findPw(@RequestBody Map<String, String> findPwMap) {
        String chgPw = findPwMap.get("chgPw");
        // 비밀번호 암호화
        String hashedPassword = passwordEncoder.encode(chgPw);
        findPwMap.put("chgPw", hashedPassword);

        List<Map<String, Object>> findPwList = userService.findPw(findPwMap);

        return findPwList;
    }

    /**
     * 비밀번호 변경
     * @param chgPwMap
     * @return ResponseEntity.ok("change pw success")
     */
    @PostMapping("/chgPw")
    public ResponseEntity<String> chgPw(@RequestBody Map<String, String> chgPwMap) {
        String userId = chgPwMap.get("userId");
        // 입력받은 패스워드
        String enteredPassword = chgPwMap.get("password");
        // 암호화된 패스워드
        String storedPasswordHash = userService.getUserPassword(userId);

        // 입력된 비밀번호, 암호화된 비밀번호 비교
        boolean passwordMatches = passwordEncoder.matches(enteredPassword, storedPasswordHash);

        if (passwordMatches) {
            String chgPw = chgPwMap.get("chgPw");
            // 비밀번호 암호화
            String hashedPassword = passwordEncoder.encode(chgPw);
            chgPwMap.put("chgPw", hashedPassword);

            List<Map<String, Object>> chgPwList = userService.chgPw(chgPwMap);
            return ResponseEntity.ok("change pw success");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonList("change pw fail").toString());
        }
    }

    // JWT 인증 테스트(/com/test)
    @PostMapping("/test")
    public String test() {
        return "auth: admin";
    }

    @PostMapping("/test2")
    public String test2() {
        return "auth: user";
    }
}
