const SinhVien = require('../models/ModalSinhVien');

const themSinhVien = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const checkSV = await SinhVien.findOne({ 'ThongTinCaNhan.maSV': data.ThongTinCaNhan.maSV });
            if (checkSV) {
                reslove({
                    status: 'fail',
                    message: 'Thong tin sinh vien bi trung lap',
                });
            } else {
                const SinhVienNew = new SinhVien(data);
                await SinhVienNew.save();
                reslove({
                    status: 'Success',
                    message: 'them moi sinh vien thanh cong',
                    data: SinhVienNew,
                });
                return SinhVienNew;
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getSVTheoMaSV = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const maSV = data.maSV;
            const findSV = await SinhVien.findOne({ 'ThongTinCaNhan.maSV': maSV });
            if (!findSV) {
                reslove({
                    status: 'fail',
                    message: 'khong tim thay sinh vien co ma ' + maSV,
                });
            } else {
                reslove({
                    status: 'success',
                    data: findSV,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    themSinhVien,
    getSVTheoMaSV,
};
