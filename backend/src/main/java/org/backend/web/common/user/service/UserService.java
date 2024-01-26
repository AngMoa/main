package org.backend.web.common.user.service;

import org.backend.web.common.user.dao.UserDao;
import org.backend.web.jwt.JwtTokenProvider;
import org.backend.web.jwt.dto.TokenInfo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserService(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public TokenInfo login(String userId, String hashedPassword) {
        List<Map<String, Object>> loginList = userDao.login(userId, hashedPassword);
        Map<String, Object> userMap = loginList.get(0);

        String nickname = (String) userMap.get("NICKNAME");
        String userNm = (String) userMap.get("USER_NM");
        String role = (String) userMap.get("USER_ROLE");

        // 입력한 정보들을 기반으로 JWT 토큰 생성
        TokenInfo tokenInfo = jwtTokenProvider.generateJwtToken(userId, nickname, userNm, role);

        return tokenInfo;
    }

    public int loginLog(Map<String,String> logMap) {
        return userDao.loginLog(logMap);
    }

    public int loginSuccess(String userId) {
        return userDao.loginSuccess(userId);
    }

    public int loginFail(String userId) {
        return userDao.loginFail(userId);
    }

    public String getUserPassword(String userId) {
        return userDao.getUserPassword(userId);
    }

    public List<Map<String, Object>> idCheck(Map<String, String> idCheckMap) {
        return userDao.idCheck(idCheckMap);
    }

    public int join(Map<String, String> userDetail) {
        return userDao.join(userDetail);
    }

    // 권한체크(로그인 여부 확인)
    public List<Map<String, Object>> checkLoginInfo() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession();
        String userId = (String) session.getAttribute("userId");

        List<Map<String, Object>> loginInfo = new ArrayList<>();

        loginInfo = sqlSessionTemplate.selectList("UserMapper.selLoginId", userId);

        return loginInfo;
    }

    public List<Map<String, Object>> findId(String userId, String userEmail) {
        return userDao.findId(userId, userEmail);
    }

    public List<Map<String, Object>> findPw(Map<String, String> findPwMap) {
        return userDao.findPw(findPwMap);
    }

    public List<Map<String, Object>> chgPw(Map<String, String> chgPwMap) {
        return userDao.chgPw(chgPwMap);
    }
}
