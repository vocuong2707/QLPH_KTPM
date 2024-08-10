// modalUser.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_DB, { dbName: 'QuanLyPhongHoc' });

const taiKhoanSchema = new mongoose.Schema({
    taikhoan: String,
    matkhau: String,
    ngaytao: Date,
    loaitaikhoan: String,
});

const TaiKhoan = db.model('taikhoan', taiKhoanSchema);

module.exports = TaiKhoan;
