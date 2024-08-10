const express = require('express');
const routes = express.Router();
const giaoVienController = require('../controllers/GiaoVienController');

routes.post('/create', giaoVienController.themGiaoVien);
routes.post('/request-schedule', giaoVienController.yeuCauThayDoiLich);

module.exports = routes;
