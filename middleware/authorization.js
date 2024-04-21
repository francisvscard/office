const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');
const secretKey = "sk_ssdbacljjk_lk_90.876!@";

// 生成token
const generateToken = function (payload) {
    const token =
        "Bearer " +
        jwt.sign(payload, secretKey, {
            expiresIn: 60 * 60 * 8,
        });
    return token;
};



module.exports = {
    generateToken,
    secretKey
}

