package org.backend.web.common.controller;

import lombok.extern.slf4j.Slf4j;
import org.backend.web.common.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@ResponseBody
@RestController
@RequestMapping("/com")
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<List<Map<String, Object>>> login(@RequestBody Map<String, String> request,
                                                           HttpServletRequest httpRequest) {
        String userId = request.get("userId");
        String enteredPassword = request.get("password");

        // 암호화된 패스워드
        String storedPasswordHash = userService.getUserPassword(userId);

        // 입력된 비밀번호, 암호화된 비밀번호 비교
        boolean passwordMatches = passwordEncoder.matches(enteredPassword, storedPasswordHash);

        if (passwordMatches) {
            List<Map<String, Object>> loginList = userService.login(userId, storedPasswordHash);

            HttpSession session = httpRequest.getSession();
            session.setAttribute("userId", userId);

            return ResponseEntity.ok(loginList);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
        }
    }



    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/join")
    public int join(@RequestBody List<Map<String, String>> userDetailList) {
        int totalJoinedUsers = 0;

        for (Map<String, String> userDetail : userDetailList) {
            String password = userDetail.get("password");

            // Hash the password using BCryptPasswordEncoder
            String hashedPassword = passwordEncoder.encode(password);

            System.out.println("회원가입 hashedPassword = "+hashedPassword);

            // Update the password in the userDetail map
            userDetail.put("password", hashedPassword);

            // Assuming that userService.join returns the number of users joined
            totalJoinedUsers += userService.join(userDetail);
        }

        return totalJoinedUsers;
    }
}
