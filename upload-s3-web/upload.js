// haimtran 04 DEC 2022
// test uploading from browser to s3

import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import * as path from "path";
import * as fs from "fs";
import { config } from "./config.js";

// s3 client
const client = new S3Client({
  region: "ap-southeast-1",
  // auto loaded from environment, role
  // credentials: {
  //   secretAccessKey: config.secretAccessKey,
  //   accessKeyId: config.accessKeyId
  // }
});

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
const uploadObject = async (bucketName, keyName) => {
  console.log(bucketName);

  try {
    const res = await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: keyName,
        Body: "Testing upload object 11223344",
      })
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = async (bucketName, keyName, fileName) => {
  try {
    const res = await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: keyName,
        // Body: fs.readFileSync("./data_nodejs.txt")
        Body: fs.createReadStream("./data_nodejs.txt"),
      })
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// upload and check progerss
const uploadToS3Progress = async (bucketName, keyName, fileName) => {
  // s3 client
  const s3Client = new S3Client({
    region: config.REGION,

    // credentials: fromCognitoIdentityPool({
    //   clientConfig: { region: config.REGION },
    //   identityPoolId: config.IDENTITY_POOL_ID,
    //   logins: {
    //     [config.COGNITO_POOL_ID]: idToken,
    //   },
    // }),
  });

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: keyName,
      Body: fs.createReadStream(fileName),
    },
  });
  upload.on("httpUploadProgress", (progress) => {
    let percent = progress.loaded / progress.total * 100.0
    console.log(`upload ${progress.total}/${progress.loaded} bytes = ${percent.toFixed(2)}%`)
  });

  const startTime = Date.now()
  await upload.done();
  const stopTime = Date.now()
  console.log(`duration = ${(stopTime - startTime)/1000.0} seconds`)


};

//
// listObjects("haimtran-workspace");
// uploadObject(config.bucketName, `test/upload_from_nodejs_${String(Date.now())}.txt`);
// uploadFile(config.bucketName, `test/${String(Date.now())}.txt`, "./data_nodejs.txt")
uploadToS3Progress(config.bucketName, `test/setup.mov`, "./setup.mov");
