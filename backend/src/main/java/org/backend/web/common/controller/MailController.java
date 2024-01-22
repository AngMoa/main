package org.backend.web.common.controller;

import org.backend.web.common.dto.EmailRequestDto;
import org.backend.web.common.dto.EmailCheckDto;
import org.backend.web.common.service.MailSendService;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Check;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MailController {
    private final MailSendService mailService;

    @PostMapping("/mailSend")
    public String mailSend(@RequestBody @Valid EmailRequestDto emailDto) {
        System.out.println("이메일 인증 이메일 :" + emailDto.getEmail());
        return mailService.joinEmail(emailDto.getEmail());
    }
    @PostMapping("/mailAuthCheck")
    public String AuthCheck(@RequestBody @Valid EmailCheckDto emailCheckDto){
        boolean Checked=mailService.CheckAuthNum(emailCheckDto.getEmail(),emailCheckDto.getAuthNum());
        if(Checked){
            return "ok";
        }
        else{
            throw new NullPointerException("관리자에게 문의해주세요.");
        }
    }
}