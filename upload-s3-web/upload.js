// haimtran 04 DEC 2022
// test uploading from browser to s3

import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

// s3 client
const client = new S3Client({ region: "ap-southeast-1" });

// list objects in a bucket
const listObjects = async (bucketName) => {
  try {
    const res = await client.send(
      new ListObjectsCommand({
        Bucket: bucketName,
      })
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// upload an object to a bucket
const uploadObject = async (bucketName) => {
  console.log(bucketName);

  try {
    const res = await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: "test-upload-object",
        Body: "Testing upload object 11223344",
      })
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

//
listObjects("haimtran-workspace");
// uploadObject("bio-register-customer");
