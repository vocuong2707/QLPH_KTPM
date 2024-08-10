const httpCode = require('../config/ErrorHandler');

module.exports = {
    sussess: (res, data, message = '') => {
        return res.status(httpCode.CODE_200).json({
            data: data,
            message: message || httpCode.MSG_200,
            code: httpCode.CODE_200,
        });
    },
    forbidden: (res, message) => {
        return res.status(httpCode.CODE_403).json({
            message: message || httpCode.MSG_403,
            code: httpCode.CODE_403,
        });
    },
    fail: (res, data, message = '') => {
        return res.status(httpCode.CODE_400).json({
            data: data,
            message: message || httpCode.MSG_400,
            code: httpCode.CODE_400,
        });
    },
    unauthorized: (res) => {
        return res.status(httpCode.CODE_401).json({
            message: httpCode.MSG_401,
            code: httpCode.CODE_401,
        });
    },
    conflict: (res, message = '') => {
        return res.status(httpCode.CODE_409).json({
            message: message ? message : httpCode.MSG_409,
            code: httpCode.CODE_409,
        });
    },
    serverError: (res, message) => {
        return res.status(httpCode.CODE_500).json({
            message: message || httpCode.MSG_500,
            code: httpCode.CODE_500,
        });
    },
};
