package org.backend.web.common.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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

    public String getUserPassword(String userId) {
        try {
            return sqlSessionTemplate.selectOne("UserMapper.encodePw", userId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<Map<String, Object>> idCheck(Map<String, String> idCheckMap) {
        return sqlSessionTemplate.selectList("UserMapper.idCheck", idCheckMap);
    }


    public int join(Map<String, String> userDetail) {
        int insUser = 0;

        List<Map<String, Object>> loginInfo = new ArrayList<>();
        String userId = userDetail.get("userId");

        loginInfo = sqlSessionTemplate.selectList("UserMapper.selLoginId", userId);

        if(loginInfo.isEmpty()) {

//        HashMap<String, Object> gridMap = new HashMap<String, Object>();
//        userDetail.get(0).forEach((key, value) -> {
//            switch (key) {
//                case "DEPLOY_NO", "DEPLOY_NM", "HP_NO", "EMAIL", "ENTR_DT", "RETR_DT",
//                        "WRK_TYP_CD", "DEL_YN", "ID_CHG_PRSN", "IP_CHG_PRSN" -> gridMap.put(key, value);
//            }
//        });
            insUser = sqlSessionTemplate.insert("UserMapper.insUser", userDetail);
        }

        return insUser;
    }

    public List<Map<String, Object>> findId(String userNm, String userHpNo) {

        Map<String, Object> params = new HashMap<>();
        params.put("userNm", userNm);
        params.put("userHpNo", userHpNo);

        List<Map<String, Object>> userId = new ArrayList<>();

        userId = sqlSessionTemplate.selectList("UserMapper.findId", params);

        return userId;
    }

    public List<Map<String, Object>> findPw(Map<String, String> findPwMap) {
        return sqlSessionTemplate.selectList("UserMapper.updatePw", findPwMap);
    }

    public List<Map<String, Object>> chgPw(Map<String, String> chgPwMap) {
        return sqlSessionTemplate.selectList("UserMapper.updatePw", chgPwMap);
    }
}
