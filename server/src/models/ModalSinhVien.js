const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_DB, { dbName: 'QuanLyPhongHoc' });

const cmndSchema = new mongoose.Schema({
    soCMND: String,
    ngayCap: Date,
    noiCap: String,
});

const hocPhanSchema = new mongoose.Schema({
    hocKi: String,
    namHoc: String,
    dsHocPhan: [String],
});

const thongTinCaNhanSchema = new mongoose.Schema({
    hoTenSV: String,
    maSV: String,
    anhDaiDien: String,
    ngaySinh: String,
    gioiTinh: String,
    noiSinh: String,
    SDT: String,
    CMND: cmndSchema,
    danToc: String,
    tonGiao: String,
    hoKhauThuongTru: String,
    email: String,
    ngayVaoDoan: Date,
});

const thongTinHocVanSchema = new mongoose.Schema({
    trangThai: String,
    maHoSo: String,
    nienKhoa: String,
    ngayVaoTruong: String,
    lopDanhNghia: String,
    bacDaoTao: String,
    loaiHinhDaoTao: String,
    khoa: String,
    chuyenNganh: String,
});

const sinhVienSchema = new mongoose.Schema({
    ThongTinCaNhan: thongTinCaNhanSchema,
    ThongTinHocVan: thongTinHocVanSchema,
    ThongTinHocPhan: {
        data: [hocPhanSchema],
    },
});

const SinhVien = db.model('SinhVien', sinhVienSchema);

module.exports = SinhVien;
