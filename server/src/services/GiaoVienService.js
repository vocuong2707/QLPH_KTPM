const GiaoVien = require('../models/ModalGiaovien');
const { getIO } = require('../configs/Socket');

const themGiaoVien = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const check = await GiaoVien.findOne({
                'ThongTinCaNhan.maGV': data.ThongTinCaNhan.maGV,
            });
            console.log(check);
            if (!check) {
                const GVNew = new GiaoVien(data);
                await GVNew.save();
                reslove({
                    status: 'Success',
                    message: 'them giao vien thanh cong',
                    data: GVNew,
                });
            } else {
                reslove({
                    status: 'FAIL',
                    message: 'Đã tồn tại giáo viên có mã ' + data.ThongTinCaNhan.maGV,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const yeuCauThayDoiLich = async (data) => {
    const io = getIO();
    return new Promise(async (reslove, reject) => {
        try {
            const GV = await GiaoVien.findOne({ 'ThongTinCaNhan.hoTenGV': data.hoTenGV });
            if (GV) {
                GV.ThongTinGiangDay.yeuCau.push({
                    thoigian: data.ngay,
                    monhoc: data.monhoc,
                    tietday: data.tietday,
                    lydo: data.lydo,
                    trangthaixacnhan: false,
                    tinnhanphanhoi: '',
                });
                await GV.save();
                io.sockets.emit('requestSchedule', GV);
                reslove({
                    status: 'Success',
                    message: 'Gửi yêu cầu thành công, vui lòng chờ xác nhận',
                    GV,
                });
            } else {
                reslove({
                    status: 'fail',
                    message: 'Có lỗi xảy ra',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    themGiaoVien,
    yeuCauThayDoiLich,
};
