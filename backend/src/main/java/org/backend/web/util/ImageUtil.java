package org.backend.web.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service
public class ImageUtil {
    @Value("${local.files-path}")
    String rootPath; // properties에서 저장할 로컬 루트 경로를 가져온다.

    @Transactional(rollbackFor = Exception.class)
    public String saveFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null; // 파일이 전송되지 않은 경우 null 반환
        }

        Date createDate = new Date();
        String year = (new SimpleDateFormat("yyyy").format(createDate)); // 년도
        String month = (new SimpleDateFormat("MM").format(createDate)); // 월
        String day = (new SimpleDateFormat("dd").format(createDate)); // 일

        rootPath = rootPath.replace("/", "\\");

        Path directory = Paths.get(rootPath, year, month, day); // Path를 사용해 디렉토리 경로 지정

        // 원래 파일 이름 앞에 uuid를 추가시킴
        String fileName = file.getOriginalFilename();
        String saveFileName = uuidFileName(fileName);

        try {
            Files.createDirectories(directory); // 경로에 폴더가 없을 경우 생성함. exception 발생하지 않음
            Path targetPath = directory.resolve(saveFileName).normalize(); // 파일이름이 포함된 경로를 추가
            if (Files.exists(targetPath)) {
                throw new IOException("중복된 파일이 있어서 실패했습니다.");
            }
            file.transferTo(targetPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return saveFileName;
    }

    private String uuidFileName(String originalFileName) {
        UUID uuid = UUID.randomUUID();
        return uuid.toString() + '_' + originalFileName;
    }
}
