import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const s3Bucket = new AWS.S3({
  params: { Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const getFileExtension = (fileName: string) => {
  return fileName.split('.')?.[1];
};

export const uploadToS3 = async (files: any[], folderPath?: string) => {
  const promises = files.map((file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME ?? '',
      Key: `${folderPath ? `${folderPath}/` : ''}${uuid()}.${getFileExtension(
        file.name,
      )}`,
    };

    return s3Bucket.upload(params).promise();
  });

  return Promise.all(promises);
};

export const deleteFromS3 = async (files: string[]) => {
  const promises = files.map((file) => {
    const fileKey = file.match(/https?:\/\/[^/]+\/([^?]+)/)?.[1];

    if (!file || !fileKey) return;

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME ?? '',
      Key: fileKey,
    };

    return s3Bucket.deleteObject(params).promise();
  });

  return Promise.all(promises);
};
