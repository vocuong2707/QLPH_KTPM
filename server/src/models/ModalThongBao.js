const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_DB, { dbName: 'QuanLyPhongHoc' });

const ThongBaoSchema = new mongoose.Schema({
    tenThongBao: String,
    slug: String,
    chiTiet: String,
    ngayTao: Date,
    danhCho: String,
    dinhKem: String,
});

const ThongBao = db.model('ThongBao', ThongBaoSchema);

module.exports = ThongBao;
