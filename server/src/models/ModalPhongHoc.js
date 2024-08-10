const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_DB, { dbName: 'QuanLyPhongHoc' });

const ThietBiSchema = new mongoose.Schema({
    tenThietBi: String,
    soLuong: Number,
});

const LoaiPhongSchema = new mongoose.Schema({
    tenLoaiPhong: String,
    thietBi: [ThietBiSchema],
});

const PhongSchema = new mongoose.Schema({
    maPhong: String,
    sucChua: Number,
    trangThai: Boolean,
    tenNha: String,
    loaiPhong: LoaiPhongSchema,
});

const PhongHoc = db.model('PhongHoc', PhongSchema);

module.exports = PhongHoc;
