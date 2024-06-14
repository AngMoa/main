package org.backend.web.common.email.controller;

import org.backend.web.common.email.dto.EmailRequestDto;
import org.backend.web.common.email.dto.EmailCheckDto;
import org.backend.web.common.email.service.MailSendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @Desc     : 이메일 인증 Controller
 * @File     : MailController.java
 * @Author   : SJY
 */
@RestController
@RequiredArgsConstructor
public class MailController {
    private final MailSendService mailService;

    /**
     * 메일 전송
     * @param emailDto
     * @return 인증번호 6자리
     */
    @PostMapping("/mailSend")
    public String mailSend(@RequestBody @Valid EmailRequestDto emailDto) {
        System.out.println("이메일 인증 이메일 :" + emailDto.getEmail());
        return mailService.joinEmail(emailDto.getEmail());
    }

    /**
     * 메일 인증번호 인증
     * @param emailCheckDto
     * @return ok
     */
    @PostMapping("/mailAuthCheck")
    public String AuthCheck(@RequestBody @Valid EmailCheckDto emailCheckDto){
        boolean Checked=mailService.CheckAuthNum(emailCheckDto.getEmail(),emailCheckDto.getAuthNum());
        if(Checked){
            return "ok";
        }
        else{
            throw new NullPointerException("인증번호를 확인해주세요.");
        }
    }
}