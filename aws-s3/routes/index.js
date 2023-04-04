var express = require('express');
var router = express.Router();
var path = require("path")
var request = require("request")
const { UploadV2, UploadV3, getKey} = require("../controller/upload")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const cdnURL = 'https://caoshiyuan-aws.s3.ap-northeast-1.amazonaws.com'

// https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/sdk-code-samples.html
/* GET home page. */
router.post('/uploadv2', async function (req, res, next) {
  const files =  Object.keys(req.files || {}).map(key=>req.files[key])
  const result = await UploadV2(files)
  res.send(result)
});
router.post('/uploadv3', async function (req, res, next) {
  const files =  Object.keys(req.files || {}).map(key=>req.files[key])
  const result = await UploadV3(files)
  res.send(result)
});


router.get('/img/:path', async function (req, res, next) {
  const awsPath = req.params.path
  const data =  await getKey(awsPath)
  data.pipe(res)

});

router.get('/img2/:path', async function (req, res, next) {
  const awsPath = req.params.path
  request.get(`http://localhost:3000/img/${awsPath}`).pipe(res)
});



module.exports = router;
