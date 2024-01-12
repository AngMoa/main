package org.backend.web.common.controller;

import lombok.extern.slf4j.Slf4j;
import org.backend.web.common.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

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

    @GetMapping(value= "/login")
    public List<Map<String, Object>> login(@RequestBody Map<String, String> request,
                                              HttpServletRequest httpRequest) {
        String userId = request.get("userId");
        String password = request.get("password");

        String hashedPassword = passwordEncoder.encode(password);

        // Assuming that loginService.selLogin returns the list of menus based on username and password
        List<Map<String, Object>> loginList = userService.login(userId, hashedPassword);

        // 암호화 테스트 코드
//        String pwd = "123";
//        String encodedPwd = passwordEncoder.encode(pwd);
//        System.out.println("1111111111111111111 = "+encodedPwd);

        // Store the username in the session
        HttpSession session = httpRequest.getSession();
        session.setAttribute("userId", userId);

        return loginList;
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("Logged out successfully");
    }
}
