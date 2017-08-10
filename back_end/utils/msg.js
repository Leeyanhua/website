var http = require("http");


// const sendSMS = (phone, code, callback) => {
//   var options = {
//     "method": "GET",
//     "hostname": "http://1255678612026018.mns.cn-hangzhou.aliyuncs.com/",
//     "port": null,
//     "path": `/singleSendSms?TemplateCode=SMS_78565129&RecNum=${phone}&ParamString={"code":${code.toString()}}`,
//     "headers": {
//       "authorization": "APPCODE 907cebf53ef8f4fd2fdf9bbff8200fdb",
//     }
//   };
//
//   const req = http.request(options, function (res) {
//     const chunks = [];
//
//     res.on("data", function (chunk) {
//       chunks.push(chunk);
//     });
//
//     res.on("end", function () {
//       const body = Buffer.concat(chunks);
//       console.log(body.toString());
//       const result = JSON.parse(body);
//       callback(null, result);
//     });
//   });
//
//   req.end();
// }
//
// sendSMS(13006354468, '23xhfs', (result) => {
//   console.log('发送成功', result);
// })
