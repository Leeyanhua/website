var request = require('request');


const sendSms = (phone, num) => {
  var options = {
    method: 'GET',
    url: 'http://ali-sms.showapi.com/sendSms',
    qs:
     { content: `{"comName":"小创","code":"${num}","minute":"5"}`,
       tNum: 'T150606060601',
       mobile: phone },
    headers:
     { authorization: 'APPCODE 1dec9adea17e4fa386867ef15b8be870' }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

}

module.exports = sendSms;
// sendSms(15071247738, 123456)
