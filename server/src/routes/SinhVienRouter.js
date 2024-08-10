const express = require('express');
const routes = express.Router();
const sinhVienController = require('../controllers/SinhVienController');

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

routes.post('/create', upload.fields([{ name: 'anhDaiDien', maxCount: 1 }]), sinhVienController.themSinhVien);
routes.post('/get-student-by-id', sinhVienController.getSVTheoMaSV);

module.exports = routes;
