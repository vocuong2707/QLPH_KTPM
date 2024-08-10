const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_DB, { dbName: 'QuanLyPhongHoc' });

const lichHocSchema = new mongoose.Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    phongHoc: String,
    ghiChu: String,
    tenGV: String,
    tietHoc: String,
});

const sinhVienSchema = new mongoose.Schema({
    maSinhVien: String,
});

const hocPhanSchema = new mongoose.Schema({
    maLopHocPhan: String,
    tenMonHoc: String,
    soTinChi: String,
    soTietLT: Number,
    soTietTH: Number,
    soBuoiHoc: Number,
    tenNhomThucHanh: String,
    trangThai: String,
    soLuong: Number,
    thongTinLich: [lichHocSchema],
    danhSachSinhVien: [sinhVienSchema],
});

const HocPhan = db.model('HocPhan', hocPhanSchema);

module.exports = HocPhan;
