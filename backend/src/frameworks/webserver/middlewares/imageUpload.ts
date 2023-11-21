import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { RequestHandler } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import configKeys from '@src/config';

cloudinary.config({
    cloud_name: configKeys.CLOUDINARY_CLOUD_NAME,
    api_key: configKeys.CLOUDINARY_API_KEY,
    api_secret: configKeys.CLOUDINARY_API_SECRET,
});

function configureMulter(field: string, limit: number, resourceType: string, allowedFormats: string[]): RequestHandler {
    const storageOptions = {
        cloudinary: cloudinary,
        params: {
            resource_type: resourceType,
            allowed_format: allowedFormats,
            folder: 'MOTOPEDIA',
        },
    };
    const storage = new CloudinaryStorage(storageOptions);
    return multer({ storage: storage }).array(field, limit);
}

function configureImageMulter(field: string, limit: number): RequestHandler {
    const resourceType = 'image';
    const allowedFormats = ['jpg', 'jpeg', 'png'];
    return configureMulter(field, limit, resourceType, allowedFormats);
}
function configureVideoMulter(field: string, limit: number): RequestHandler {
    const resourceType = 'video';
    const allowedFormats = ['mp4', 'mov'];
    return configureMulter(field, limit, resourceType, allowedFormats);
}

function configureImageAndVideoMulter(field: string, limit: number): RequestHandler {
    const resourceType = 'auto';
    const allowedFormats = ['jpg', 'jpeg', 'png', 'mp4', 'mov'];
    return configureMulter(field, limit, resourceType, allowedFormats);
}

export const uploadSingleImage: RequestHandler = configureImageMulter('image', 1);
export const uploadMultipleImages: RequestHandler = configureImageMulter('image', 5);
export const uploadSingleVideo: RequestHandler = configureVideoMulter('video', 1);
export const uploadMultipleVideos: RequestHandler = configureVideoMulter('video', 5);
export const uploadImagesAndVideos: RequestHandler = configureImageAndVideoMulter('files', 2);
