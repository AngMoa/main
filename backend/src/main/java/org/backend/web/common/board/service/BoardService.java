package org.backend.web.common.board.service;

import org.backend.web.common.board.dto.BoardDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BoardService {
    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public List<Map<String, Object>> boardList(BoardDto boardDto) {
        return sqlSessionTemplate.selectList("BoardMapper.read", boardDto);
    }

}
