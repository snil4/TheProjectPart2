package com.yiftach.TheProjectPart3.app.core.services;

import com.yiftach.TheProjectPart3.app.core.entities.ImageData;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.repositories.CouponRepo;
import com.yiftach.TheProjectPart3.app.core.repositories.ImageDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Transactional
public class ImageDataService {

    @Autowired
    private ImageDataRepo imageDataRepository;
    @Autowired
    private CouponRepo couponRepo;

    /**
     * @param file The image to upload
     * @return The file's final name
     */
    public String uploadImage(MultipartFile file) throws CouponSystemException {
        String fileName = file.getOriginalFilename();
        try {
//            if (imageDataRepository.findByName(file.getOriginalFilename()).isPresent()) {
//                fileName = "_" + file.getOriginalFilename();
//            } else {
//                fileName = file.getOriginalFilename();
//            }
//            ImageData imageData = new ImageData(0L, fileName, file.getContentType(),
//                    ImageUtil.compressImage(file.getBytes()));
//
//            imageDataRepository.save(imageData);
//            return imageData.getName();

            if (couponRepo.existsByImageName(fileName)) {
                fileName = "_" + fileName;
            }

            Path path = Path.of("assets/images/" + fileName);
            path.toFile().createNewFile();
            Files.write(path, file.getBytes());
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
            throw new CouponSystemException("Can't upload image: " + e.getMessage(), e);
        }

    }

    /**
     * @param name The image file's name
     * @return the imageData object
     */
    public ImageData getInfoByImageByName(String name) throws CouponSystemException {
        try {
//            Optional<ImageData> dbImage = imageDataRepository.findByName(name);
//
//            if (dbImage.isPresent()) {
//                ImageData imageData = dbImage.get();
//
//                return new ImageData(imageData.getId(), imageData.getName(), imageData.getType(),
//                        ImageUtil.decompressImage(imageData.getImageData()));
//            } else {
//                return null;
//            }
            if (!name.equals("")) {
                String[] splitName = name.split("[.]");
                String fileType = splitName[splitName.length - 1];
                return new ImageData(0L, name, "image/" + fileType,
                        Files.readAllBytes(Paths.get("assets/images/" + name)));
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new CouponSystemException("Can't get info: " + e.getMessage(), e);
        }
    }

    public byte[] getImage(String name) throws CouponSystemException {
        try {
            if (!name.equals("")) {
                return Files.readAllBytes(Paths.get("assets/images/" + name));
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new CouponSystemException("Can't get image: " + e.getMessage(), e);
        }
    }

}
