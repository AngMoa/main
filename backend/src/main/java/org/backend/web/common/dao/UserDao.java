package org.backend.web.common.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserDao {
    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public List<Map<String, Object>> login(String userId, String hashedPassword) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        params.put("password", hashedPassword);

        List<Map<String, Object>> loginInfo = new ArrayList<>();

        loginInfo = sqlSessionTemplate.selectList("UserMapper.login", params);

        return loginInfo;
    }
}
