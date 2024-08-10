const express = require('express');
const routes = express.Router();
const hocPhanController = require('../controllers/HocPhanController');

routes.post('/create', hocPhanController.taoHocPhan);
routes.post('/delete', hocPhanController.xoaHocPhan);
routes.post('/open-course', hocPhanController.moLopHocPhan);
routes.post('/get-by-id', hocPhanController.getHocPhanTheoMaHP);
routes.get('/get-all-hp', hocPhanController.getAllHocPhan);

module.exports = routes;
