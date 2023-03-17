package com.yiftach.TheProjectPart3.app.core.util;

import com.yiftach.TheProjectPart3.app.core.exceptions.CouponSystemException;

import java.io.ByteArrayOutputStream;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class ImageUtil {

    public static byte[] compressImage(byte[] data) throws CouponSystemException {

        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        while (!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp, 0, size);
        }
        try {
            outputStream.close();
        } catch (Exception e) {
            throw new CouponSystemException("Can't compress image: " + e.getMessage(),e);
        }
        return outputStream.toByteArray();
    }

    public static byte[] decompressImage(byte[] data) throws CouponSystemException {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        } catch (Exception e) {
            throw new CouponSystemException("Can't decompress image: " + e.getMessage(),e);
        }
        return outputStream.toByteArray();
    }
}