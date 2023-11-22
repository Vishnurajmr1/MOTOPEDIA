import { CloudServiceImpl } from '@src/frameworks/services/s3Service';

export const cloudServiceInterface = (service: ReturnType<CloudServiceImpl>) => {
    const upload = async (file: Express.Multer.File,contentType:string) => await service.uploadFile(file,contentType);
    const uploadAndGetUrl = async (file: Express.Multer.File,contentType:string) => await service.uploadAndGetUrl(file,contentType);
    const getFile = async (fileKey: string) => await service.getFile(fileKey);
    const getVideoStream = async (fileKey: string) => await service.getVideoStream(fileKey);
    const removeFile = async (fileKey: string) => await service.removeFile(fileKey);
    return {
        upload,
        uploadAndGetUrl,
        getFile,
        getVideoStream,
        removeFile,
    };
};
export type CloudServiceInterface = typeof cloudServiceInterface;
