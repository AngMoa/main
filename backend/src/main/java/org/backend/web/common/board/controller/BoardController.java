package org.backend.web.common.board.controller;

import org.backend.web.common.board.dto.BoardDto;
import org.backend.web.common.board.service.BoardService;
import org.backend.web.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@ResponseBody
@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private ImageUtil imageUtil;

    @Autowired
    BoardService boardService;

    @PostMapping(value = "/boardList")
    public List<Map<String, Object>> boardList(@RequestBody(required = false) BoardDto boardDto) {
        return boardService.boardList(boardDto);
    }
}
