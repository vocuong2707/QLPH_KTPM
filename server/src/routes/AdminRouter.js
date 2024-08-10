const express = require('express');
const routes = express.Router();
const adminController = require('../controllers/AdminController');
const cloudinary = require('../configs/Cloudunary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'file',
    allowedFormats: ['jpg', 'png', 'jpeg', 'xlsx', 'docx'],
    resource_type: 'auto',
    use_filename: true,
});

const upload = multer({ storage: storage });

routes.post('/add-classroom', adminController.themPhongHoc);
routes.post('/update-classroom', adminController.capNhatPhongHoc);
routes.post('/maintaince-classroom', adminController.baoTriPhongHoc);
routes.post('/move-schedule', adminController.chuyenLichHoc);
routes.post('/get-match-schedule', adminController.getPhongHocPhuHop);
routes.post('/add-schedule', adminController.themLichHoc);
routes.post('/update-schedule', adminController.capNhatLichHoc);
routes.post('/cancel-schedule', adminController.tamHoanLichHoc);
routes.post('/create-appointment', adminController.themCuocHop);
routes.post('/create-notify', upload.fields([{ name: 'dinhKem', maxCount: 1 }]), adminController.taoThongBao);
routes.post('/delete-notify', adminController.xoaThongBao);
routes.get('/delete-all-notify', adminController.xoaAllThongBao);
routes.post('/confirm-request', adminController.xacNhanYeuCau);
routes.post('/reset-password', adminController.datLaiMatKhau);
routes.post('/delete-account', adminController.xoaTaiKhoan);

module.exports = routes;
