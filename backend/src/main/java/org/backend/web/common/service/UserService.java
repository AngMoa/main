package org.backend.web.common.service;

import org.backend.web.common.dao.UserDao;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public List<Map<String, Object>> login(String userId, String hashedPassword) {
        return userDao.login(userId, hashedPassword);
    }

    public String getUserPassword(String userId) {
        // Assuming userDao.getUserPassword returns the password hash for the given userId
        return userDao.getUserPassword(userId);
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
}
