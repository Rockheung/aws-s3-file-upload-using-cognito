const AWS = require("aws-sdk");

// Amazon Cognito 인증 공급자를 초기화합니다
AWS.config.region = "ap-northeast-2"; // 리전
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "ap-northeast-2:eb1abefb-f984-4f65-8d33-9b50110fa47a"
});

module.exports = AWS;
