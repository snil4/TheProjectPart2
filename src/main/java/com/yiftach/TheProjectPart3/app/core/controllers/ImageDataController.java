package com.yiftach.TheProjectPart3.app.core.controllers;

import com.yiftach.TheProjectPart3.app.core.entities.ImageData;
import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;
import com.yiftach.TheProjectPart3.app.core.services.ImageDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/image")
@Transactional
public class ImageDataController {

    @Autowired
    private ImageDataService imageDataService;

    @PostMapping
    public ResponseEntity<ImageData> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(imageDataService.uploadImage(file));
        } catch (CouponSystemException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/info/{name}")
    public ResponseEntity<ImageData> getImageInfoByName(@PathVariable("name") String name){
        try {
            ImageData image = imageDataService.getInfoByImageByName(name);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(image);
        } catch (CouponSystemException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/{name}")
    public ResponseEntity<byte[]>  getImageByName(@PathVariable("name") String name){
        try {
            byte[] image = imageDataService.getImage(name);

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf("image/png"))
                    .body(image);
        } catch (CouponSystemException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}