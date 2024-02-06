package org.backend.web.common.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BoardDto {
    private Long boardId;          // 게시물 번호
    private String boardTitle;     // 게시물 제목
    private String boardContent;   // 게시물 내용
    private String nickname;       // 작성자 닉네임
    private String userId;         // 사용자 ID
    private String crerId;         // 작성자 ID
    private Date creDtm;           // 작성일
    private String chgrId;         // 수정자 ID
    private Date chgDtm;           // 수정일
    private String boardTyp;       // 게시물 유형 (1: 자유게시판, 2: Q&A, 3: 제보, 4: 공지사항)
}
