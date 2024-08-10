const HocPhan = require('../models/ModalHocPhan');

const taoHocPhan = (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const { maHP, tenHocPhan, tinChi, startDate, tenGV, soLuong, tietHoc, phongHoc, tenNhomThucHanh } =
                data.body;

            const checkHP = await HocPhan.findOne({
                maLopHocPhan: maHP,
            });

            let gioHocStart = '';
            let gioHocEnd = '';

            switch (tietHoc) {
                case '1-3': {
                    gioHocStart = '06:30:00';
                    gioHocEnd = '09:00:00';
                    break;
                }
                case '4-6': {
                    gioHocStart = '09:10:00';
                    gioHocEnd = '11:40:00';
                    break;
                }
                case '7-9': {
                    gioHocStart = '12:30:00';
                    gioHocEnd = '15:00:00';
                    break;
                }
                case '10-12': {
                    gioHocStart = '15:10:00';
                    gioHocEnd = '17:40:00';
                    break;
                }
                default: {
                    gioHocStart = '06:30:00';
                    gioHocEnd = '9:00:00';
                    break;
                }
            }
            const start = new Date(`${startDate}T${gioHocStart}.000Z`);
            const end = new Date(`${startDate}T${gioHocEnd}.000Z`);

            let buoiHoc = 0;
            let lt = 0;
            let th = 0;

            if (tenNhomThucHanh !== '') {
                if (tinChi === 3) {
                    buoiHoc = 20;
                    lt = 30;
                    th = 30;
                } else if (tinChi === 4) {
                    buoiHoc = 25;
                    lt = 45;
                    th = 30;
                }
            } else {
                if (tinChi === 2) {
                    buoiHoc = 10;
                    lt = 30;
                } else if (tinChi === 3) {
                    buoiHoc = 15;
                    lt = 45;
                }
            }

            const thongTinLich = [];
            for (let i = 0; i < buoiHoc; i++) {
                const newStart = new Date(start);
                newStart.setDate(start.getDate() + i * 7); // Tăng thêm 7 ngày cho mỗi buổi học

                const newEnd = new Date(end);
                newEnd.setDate(end.getDate() + i * 7);

                thongTinLich.push({
                    title: tenHocPhan,
                    startDate: newStart,
                    endDate: newEnd,
                    phongHoc: phongHoc,
                    ghiChu: 'Không có nhắc nhở',
                    tenGV: tenGV,
                    tietHoc: tietHoc,
                });
            }

            const a = {
                maLopHocPhan: maHP,
                tenMonHoc: tenHocPhan,
                soTinChi: tinChi,
                soTietLT: lt,
                soTietTH: th,
                soBuoiHoc: buoiHoc,
                tenNhomThucHanh: tenNhomThucHanh,
                trangThai: 'Đã mở đăng kí',
                soLuong: soLuong,
                thongTinLich: thongTinLich,
                danhSachSinhVien: [],
            };

            if (checkHP.tenNhomThucHanh !== tenNhomThucHanh) {
                await new HocPhan(a).save();
                const DSHP = await HocPhan.find();
                reslove({
                    status: 'success',
                    message: 'tao hoc phan thanh cong',
                    DSHP,
                });
            } else {
                reslove({
                    status: 'fail',
                    message: 'Tạo học phần không thành công',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const xoaHocPhan = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hocPhan = await HocPhan.findOne({ _id: data.key });

            if (!hocPhan) {
                return resolve({
                    status: 'fail',
                    message: 'Không tìm thấy học phần',
                });
            } else {
                await hocPhan.deleteOne();
                const DSHP = await HocPhan.find();
                return resolve({
                    status: 'success',
                    message: 'Đóng lớp thành công',
                    DSHP,
                });
            }
        } catch (error) {
            return reject(error);
        }
    });
};

const moLopHocPhan = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hocPhan = await HocPhan.findOne({ _id: data.key });

            if (!hocPhan) {
                return resolve({
                    status: 'fail',
                    message: 'Không tìm thấy học phần',
                });
            } else {
                await hocPhan.updateOne({ trangThai: 'Chấp nhận mở lớp' });
                const DSHP = await HocPhan.find();
                return resolve({
                    status: 'success',
                    message: 'Mở lớp thành công',
                    DSHP,
                });
            }
        } catch (error) {
            return reject(error);
        }
    });
};

const getHocPhanTheoMaHP = (maHP) => {
    return new Promise(async (reslove, reject) => {
        try {
            const HP = await HocPhan.findOne({ maLopHocPhan: maHP.maLopHocPhan });
            if (!HP) {
                reslove({
                    status: 'fail',
                    message: 'Khong tim thay ma hoc phan',
                });
            } else {
                reslove({
                    status: 'success',
                    data: HP,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllHocPhan = () => {
    return new Promise(async (reslove, reject) => {
        try {
            const DSHP = await HocPhan.find();
            if (!DSHP) {
                reslove({
                    status: 'fail',
                    message: 'danh sanh trong',
                });
            } else {
                reslove({
                    status: 'success',
                    data: DSHP,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    taoHocPhan,
    xoaHocPhan,
    moLopHocPhan,
    getHocPhanTheoMaHP,
    getAllHocPhan,
};
