import { CloudFrontClient } from '@aws-sdk/client-cloudfront';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import configKeys from '@src/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
const s3 = new S3Client({
    credentials: {
        accessKeyId: configKeys.AWS_ACCESS_KEY,
        secretAccessKey: configKeys.AWS_SECRET_KEY,
    },
    region: configKeys.AWS_BUCKET_REGION,
});

const cloudFront = new CloudFrontClient({
    credentials: {
        accessKeyId: configKeys.AWS_ACCESS_KEY,
        secretAccessKey: configKeys.AWS_SECRET_KEY,
    },
    region: configKeys.AWS_BUCKET_REGION,
});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const s3Service = () => {
    const uploadFile = async (file: Express.Multer.File) => {
        const key = randomImageName();
        const params = {
            Bucket: configKeys.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const command = new PutObjectCommand(params);
        await s3.send(command);
        return {
            name: file.originalname,
            key,
        };
    };
    const uploadAndGetUrl = async (file: Express.Multer.File) => {
        const key = randomImageName();
        const params = {
            Bucket: configKeys.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: ObjectCannedACL.public_read,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);
        const url = `https://${configKeys.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;

        return {
            name: file.originalname,
            key,
            url,
        };
    };

    const getFile = async (fileKey: string) => {
        const getObjectParams = {
            Bucket: configKeys.AWS_BUCKET_NAME,
            Key: fileKey,
        };
        const command = new GetObjectCommand(getObjectParams);
        return await getSignedUrl(s3, command, { expiresIn: 60000 });
    };
    const getVideoStream = async (key: string): Promise<NodeJS.ReadableStream> => {
        const s3Params = {
            Bucket: configKeys.AWS_BUCKET_NAME,
            Key: key,
        };

        const command = new GetObjectCommand(s3Params);
        const { Body } = await s3.send(command);
        return Body as NodeJS.ReadableStream;
    };
    const removeFile = async (fileKey: string) => {
        const params = {
            Bucket: configKeys.AWS_BUCKET_NAME,
            Key: fileKey,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
    };

    return {
        uploadFile,
        uploadAndGetUrl,
        getFile,
        getVideoStream,
        removeFile,
    };
};
export type CloudServiceImpl = typeof s3Service;
