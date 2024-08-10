const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_DB, { dbName: 'QuanLyPhongHoc' });

const DanhSachYeuCau = new mongoose.Schema({
    thoigian: Date,
    monhoc: String,
    tietday: String,
    lydo: String,
    trangthaixacnhan: Boolean,
    tinnhanphanhoi: String,
});

const GiaoVienSchema = new mongoose.Schema({
    ThongTinCaNhan: {
        maGV: String,
        hoTenGV: String,
        tuoi: Number,
        anhDaiDien: String,
        gioiTinh: String,
        chucVu: String,
        khoa: String,
        email: String,
        SDT: String,
    },
    ThongTinGiangDay: {
        lichDay: [String],
        yeuCau: [DanhSachYeuCau],
    },
});

const GiaoVien = db.model('GiaoVien', GiaoVienSchema);

module.exports = GiaoVien;
