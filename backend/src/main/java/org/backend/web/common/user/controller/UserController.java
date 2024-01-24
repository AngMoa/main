package org.backend.web.common.user.controller;

import lombok.extern.slf4j.Slf4j;
import org.backend.web.common.user.service.UserService;
import org.backend.web.util.ClientUtils;
import org.backend.web.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

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

    // 로그인
    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginMap, HttpServletRequest httpRequest) {
        String userId = loginMap.get("userId");
        String enteredPassword = loginMap.get("password");
        String ip = ClientUtils.getRemoteIP(httpRequest);

        // 암호화된 패스워드
        String storedPasswordHash = userService.getUserPassword(userId);

        // 입력된 비밀번호, 암호화된 비밀번호 비교
        boolean passwordMatches = passwordEncoder.matches(enteredPassword, storedPasswordHash);

        // 로그인 로그 생성
        Map<String, String> logMap = createLoginLogMap(ip, userId, passwordMatches);
        int insLoginLog = userService.loginLog(logMap);

        if (passwordMatches) {
            handleSuccessfulLogin(userId, storedPasswordHash, httpRequest);
            return ResponseEntity.ok("로그인 성공");
        } else {
            handleFailedLogin(userId);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디, 패스워드를 다시 한번 확인해주세요.");
        }
    }

    // 성공적인 로그인 처리 메서드
    private void handleSuccessfulLogin(String userId, String password, HttpServletRequest httpRequest) {
        List<Map<String, Object>> loginList = userService.login(userId, password);

        if (!loginList.isEmpty()) {
            // 로그인 실패 횟수 초기화
            userService.loginSuccess(userId);

            Map<String, Object> userMap = loginList.get(0);

            // 세션 설정
            setSessionAttributes(httpRequest, userMap);
        }
    }

    // 로그인 실패 처리 메서드
    private void handleFailedLogin(String userId) {
        userService.loginFail(userId);
    }

    // 로그인 로그를 위한 Map 생성 메서드
    private Map<String, String> createLoginLogMap(String ip, String userId, boolean passwordMatches) {
        Map<String, String> logMap = new HashMap<>();
        logMap.put("ip", ip);
        logMap.put("loginYn", passwordMatches ? "Y" : "N");
        logMap.put("userId", userId);
        return logMap;
    }

    // 세션 속성 설정 메서드
    private void setSessionAttributes(HttpServletRequest httpRequest, Map<String, Object> userMap) {
        HttpSession session = httpRequest.getSession();
        session.setAttribute("userId", userMap.get("USER_ID"));
        session.setAttribute("userNm", userMap.get("USER_NM"));
        session.setAttribute("nickname", userMap.get("NICKNAME"));
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("Logged out successfully");
    }

    // id 중복체크, id 확인이 필요한 경우
    @PostMapping(value = "/idCheck")
    public List<Map<String, Object>> idCheck(@RequestBody Map<String, String> idCheckMap) {
        return userService.idCheck(idCheckMap);
    }

    // 회원가입
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

    // 아이디 찾기
    @PostMapping("/findId")
    public List<Map<String, Object>> findId(@RequestBody Map<String, String> request) {
        String userNm = request.get("userNm");
        String userEmail = request.get("userEmail");
        return userService.findId(userNm, userEmail);
    }

    // 비밀번호 찾기
    @PostMapping("/findPw")
    public List<Map<String, Object>> findPw(@RequestBody Map<String, String> findPwMap) {
        String chgPw = findPwMap.get("chgPw");
        // 비밀번호 암호화
        String hashedPassword = passwordEncoder.encode(chgPw);
        findPwMap.put("chgPw", hashedPassword);

        List<Map<String, Object>> findPwList = userService.findPw(findPwMap);

        return findPwList;
    }

    // 비밀번호 변경
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
}
