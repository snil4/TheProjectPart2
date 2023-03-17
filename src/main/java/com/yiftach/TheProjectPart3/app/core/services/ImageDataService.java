
package com.yiftach.TheProjectPart3.app.core.services;

import com.yiftach.TheProjectPart3.app.core.entities.Coupon;
import com.yiftach.TheProjectPart3.app.core.entities.ImageData;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.repositories.ImageDataRepo;
import com.yiftach.TheProjectPart3.app.core.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;

@Service
public class ImageDataService {

    @Autowired
    private ImageDataRepo imageDataRepository;

    public ImageData uploadImage(MultipartFile file) throws CouponSystemException {

        try {
            ImageData imageData = new ImageData(0L,file.getOriginalFilename(), file.getContentType(),
                    ImageUtil.compressImage(file.getBytes()));

            imageDataRepository.save(imageData);
            return imageData;
        } catch (Exception e) {
            throw new CouponSystemException("Can't upload image: " + e.getMessage(), e);
        }

    }

    public ImageData getInfoByImageByName(String name) throws CouponSystemException {
        try {
            Optional<ImageData> dbImage = imageDataRepository.findByName(name);

            if (dbImage.isPresent()) {
                ImageData imageData = dbImage.get();

                return new ImageData(imageData.getId(), imageData.getName(), imageData.getType(),
                        ImageUtil.decompressImage(imageData.getImageData()));
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new CouponSystemException("Can't get info: " + e.getMessage(),e);
        }
    }

    @Transactional
    public byte[] getImage(String name) throws CouponSystemException {
        try {
            Optional<ImageData> dbImage = imageDataRepository.findByName(name);
            byte[] image = ImageUtil.decompressImage(dbImage.get().getImageData());
            return image;
        } catch (Exception e) {
            throw new CouponSystemException("Can't get image: " + e.getMessage(), e);
        }
    }


}
