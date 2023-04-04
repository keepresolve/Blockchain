
const { PutObjectCommand, CreateBucketCommand, S3Client, GetObjectCommand } = require("@aws-sdk/client-s3")
const AWS = require('aws-sdk')
const fs = require("fs")
const uuid = require("uuid")
// const MD5 = require('md5');
const path = require("path")



// #https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/browsers-supported.html


const REGION = process.env.REGION
const BUCKET = process.env.BUCKET
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY




async function sendFiles(file) {

    const s3Client = new S3Client({
        region: REGION,  //
        // 线上不需要
        // accessKeyId: AWS_ACCESS_KEY_ID, 
        // secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
    var file_name = "u_b_" + uuid.v1() + path.extname(file.name);
    const params = {
        Bucket: BUCKET, // The name of the bucket. For example, 'sample-bucket-101'.
        Key: file_name || file.name, // The name of the object. For example, 'sample_upload.txt'.
        Body: fs.readFileSync(file.tempFilePath), // The content of the object. For example, 'Hello world!".
    };
    try {
        file.s3_name = file_name
        const results = await s3Client.send(new PutObjectCommand(params));
        // console.log(`Successfully created ${params.Key} and uploaded it to  ${params.Bucket}/${params.Key} `)
        fs.unlinkSync(file.tempFilePath)
        // return results; // For unit tests.
        if (results.$metadata && results.$metadata.httpStatusCode == 200) {
            return {
                status: 200,
                file,
             
                results,
                message: "success"
            }
        }
        return {
            status: 3001,
            file,
            results: [],
            message: JSON.stringify(result)
        }
    } catch (err) {
        console.log("Error", err);
        return {
            status: 3001,
            file,
            results: [],
            message: "upload s3 Error"
        }
    }

}

async function UploadV3(files) {


    const results = await Promise.all(files.map(sendFiles))

    return {
        status: 0,
        results
    }
}
async function UploadV2(files) {
    const s3 = new AWS.S3({
        // 线上不需要
        // accessKeyId: AWS_ACCESS_KEY_ID,
        // secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: process.env.REGION
    })
    const results = await Promise.all(files.map(file => {

        return new Promise((res, rej) => {
            let params = {}
            let file_name = `u_b_${uuid.v1()}`
            try {
                file_name += path.extname(file.name);
                file.s3_name = file_name
                params = {
                    Bucket: BUCKET,
                    Key: file_name || file.name,
                    Body: fs.readFileSync(file.tempFilePath)
                }
            } catch (error) {
                return res({
                    status: 3001,
                    file,
                    result: error,
                    message: "read file Error"
                })
            }

            s3.upload(params, (err, data) => {
                fs.unlinkSync(file.tempFilePath)
                if (err) {
                    console.error(err)
                    return res({
                        status: 3001,
                        file,
                        result: err,
                        message: "upload s3 error"
                    })
                }
                res({
                    status: 200,
                    file,
                    result: data,
                    message: "success"
                })
            })
        })
    }))

    return {
        status: 0,
        results
    }


}

// 获取资源
async function getKey(Key) {
    const command = new GetObjectCommand({
        Bucket: BUCKET, //
        Key
    });
    const s3Client = new S3Client({
        region: REGION,  //
        // 线上不需要
        // accessKeyId: AWS_ACCESS_KEY_ID, 
        // secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
    try {
        const response = await s3Client.send(command);
        // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
        // const str = await response.Body.transformToWebStream();
        return response.Body
    } catch (err) {
        console.error(err);
    }

}


module.exports = {
    UploadV3,
    UploadV2,
    getKey
}