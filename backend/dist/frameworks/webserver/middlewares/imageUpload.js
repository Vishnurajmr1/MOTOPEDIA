"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImagesAndVideos = exports.uploadMultipleVideos = exports.uploadSingleVideo = exports.uploadMultipleImages = exports.uploadSingleImage = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const config_1 = __importDefault(require("../../../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.default.CLOUDINARY_API_KEY,
    api_secret: config_1.default.CLOUDINARY_API_SECRET,
});
function configureMulter(field, limit, resourceType, allowedFormats) {
    const storageOptions = {
        cloudinary: cloudinary_1.v2,
        params: {
            resource_type: resourceType,
            allowed_format: allowedFormats,
            folder: 'MOTOPEDIA',
        },
    };
    const storage = new multer_storage_cloudinary_1.CloudinaryStorage(storageOptions);
    return (0, multer_1.default)({ storage: storage }).array(field, limit);
}
function configureImageMulter(field, limit) {
    const resourceType = 'image';
    const allowedFormats = ['jpg', 'jpeg', 'png'];
    return configureMulter(field, limit, resourceType, allowedFormats);
}
function configureVideoMulter(field, limit) {
    const resourceType = 'video';
    const allowedFormats = ['mp4', 'mov'];
    return configureMulter(field, limit, resourceType, allowedFormats);
}
function configureImageAndVideoMulter(field, limit) {
    const resourceType = 'auto';
    const allowedFormats = ['jpg', 'jpeg', 'png', 'mp4', 'mov'];
    return configureMulter(field, limit, resourceType, allowedFormats);
}
exports.uploadSingleImage = configureImageMulter('image', 1);
exports.uploadMultipleImages = configureImageMulter('image', 5);
exports.uploadSingleVideo = configureVideoMulter('video', 1);
exports.uploadMultipleVideos = configureVideoMulter('video', 5);
exports.uploadImagesAndVideos = configureImageAndVideoMulter('files', 2);
//# sourceMappingURL=imageUpload.js.map