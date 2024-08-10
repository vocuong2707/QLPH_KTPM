const slugify = require('slugify');
const unidecode = require('unidecode');
const moment = require('moment');
const moment2 = require('moment-timezone'); // Import thư viện moment-timezone
const VIETNAM_TIMEZONE = 'Asia/Ho_Chi_Minh';
const bcrypt = require('bcrypt');
const PhongHoc = require('../models/ModalPhongHoc');
const ThongBao = require('../models/ModalThongBao');
const HocPhan = require('../models/ModalHocPhan');
const GiaoVien = require('../models/ModalGiaovien');
const TaiKhoan = require('../models/ModalTaiKhoan');
const mongoose = require('mongoose');
const { getIO } = require('../configs/Socket');

const themPhongHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const checkExist = await PhongHoc.findOne({
                maPhong: data.maPhong,
            });
            if (checkExist) {
                reslove({
                    status: 'fail',
                    message: 'Đã tồn tại phòng học có mã ' + data.maPhong,
                });
            }

            // let found = false;
            // const typePhong = await PhongHoc.find({ 'loaiPhong.tenLoaiPhong': data.loaiPhong.tenLoaiPhong });
            // typePhong.forEach((key) => {
            //     if (key.tenNha === data.tenNha) {
            //         found = true;
            //     }
            // });
            // if (!found) {
            //     reslove({
            //         status: 'fail',
            //         message:
            //             'Không tìm thấy tòa nhà ' + data.tenNha + ' trong danh sách ' + data.loaiPhong.tenLoaiPhong,
            //     });
            // }

            const newPhongHoc = new PhongHoc(data);
            await newPhongHoc.save();

            const DSPH = await PhongHoc.find();
            const io = getIO();
            io.sockets.emit('addClassroom', DSPH);
            reslove({
                status: 'success',
                message: 'Thêm phòng học thành công',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const capNhatPhongHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const phongHoc = await PhongHoc.findOneAndUpdate({ maPhong: data.maPhong }, { $set: data });

            if (!phongHoc) {
                reslove({
                    status: 'fail',
                    message: 'Không tìm thấy phòng học để cập nhật',
                });
            }

            const DSPH = await PhongHoc.find();
            const io = getIO();
            io.sockets.emit('updateClassroom', DSPH);
            reslove({
                status: 'success',
                message: 'Cập nhật thành công',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const baoTriPhongHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            console.log(data);
            const updatedData = await Promise.all(
                data.map(async (item) => {
                    const hocPhan = await HocPhan.findOne({ tenMonHoc: item.title });
                    if (!hocPhan) {
                        throw new Error('Học phần không tồn tại');
                    }
                    hocPhan.thongTinLich.forEach((lichHoc, key) => {
                        const lichid = lichHoc._id.toString();
                        if (lichid === item._id) {
                            lichHoc.ghiChu = 'Tạm ngưng';
                        }
                    });
                    return hocPhan.save();
                }),
            );

            const DSHP = await HocPhan.find();

            const io = getIO();
            io.sockets.emit('maintanceClassroom', DSHP);

            reslove({
                status: 'success',
                message: 'Đã tạp ngưng lịch để tiến hành bảo trì',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getPhongHocPhuHop = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            // console.log(data);
            const typePhong = await PhongHoc.findOne({ maPhong: data[0].phongHoc });
            const phonghoc = await PhongHoc.find({
                maPhong: { $ne: data[0].phongHoc },
                'loaiPhong.tenLoaiPhong': typePhong.loaiPhong.tenLoaiPhong,
                sucChua: { $gte: typePhong.sucChua },
            });
            const lich = await HocPhan.find();
            const mergedLich = lich.reduce((acc, curr) => {
                curr.thongTinLich.forEach((item) => {
                    acc.push(item);
                });
                return acc;
            }, []);

            const filteredLich = mergedLich.filter((item) => {
                return phonghoc.some((phong) => phong.maPhong === item.phongHoc);
            });

            const convertedData = data.map((item) => {
                return {
                    ...item,
                    startDate: moment2
                        .tz(item.startDate, 'MM/DD/YYYY, hh:mm:ss A', VIETNAM_TIMEZONE)
                        .add(7, 'hours') // Cộng thêm 7 giờ do trễ múi giờ
                        .toDate(),
                    endDate: moment2
                        .tz(item.endDate, 'MM/DD/YYYY, hh:mm:ss A', VIETNAM_TIMEZONE)
                        .add(7, 'hours') // Cộng thêm 7 giờ do trễ múi giờ
                        .toDate(),
                };
            });

            const sameLich = filteredLich.filter((item1) => {
                return convertedData.some((item2) => {
                    return (
                        new Date(item1.startDate).getTime() === new Date(item2.startDate).getTime() &&
                        new Date(item1.endDate).getTime() === new Date(item2.endDate).getTime()
                    );
                });
            });

            const filteredPhongHoc = phonghoc.filter((phong) => {
                return !sameLich.some((lich) => phong.maPhong === lich.phongHoc);
            });
            if (!filteredPhongHoc) {
                reslove({
                    status: 'fail',
                    message: 'không tìm thấy phòng học trống cho những lịch trên',
                });
            }
            reslove({
                status: 'success',
                data: filteredPhongHoc,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const chuyenLichHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const DSHP = await HocPhan.find();
            for (const hocPhan of DSHP) {
                hocPhan.thongTinLich.forEach((lich) => {
                    const found = data.appointments.some((item) => item._id.toString() === lich._id.toString());
                    if (found) {
                        lich.phongHoc = data.room.maPhong;
                    }
                });
                await hocPhan.save();
            }
            reslove({
                status: 'success',
                message: 'Đã chuyển lịch sang phòng mới: ' + data.room.maPhong,
                data: DSHP,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const themLichHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            console.log(data);
            reslove({
                status: 'Success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const capNhatLichHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const monhoc = await HocPhan.findOne({ maLopHocPhan: data.maMonHoc });
            const dataId = data._id.toString();
            monhoc.thongTinLich.map((value) => {
                const valueIdString = value._id.toString();
                if (valueIdString === dataId) {
                    value.phongHoc = data.phongHoc;
                    value.ghiChu = data.ghiChu;
                    value.tenGV = data.tenGV;
                    value.tietHoc = data.tietHoc;
                    return value;
                }
            });
            await monhoc.save();
            const io = getIO();
            io.sockets.emit('updateSchedule', { monhoc });
            reslove({
                status: 'Success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const tamHoanLichHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const monhoc = await HocPhan.findOne({ maLopHocPhan: data.maMonHoc });
            const dataId = data._id.toString();
            monhoc.thongTinLich.map((value) => {
                const valueIdString = value._id.toString();
                if (valueIdString === dataId) {
                    value.ghiChu = 'Tạm ngưng';
                    return value;
                }
            });
            await monhoc.save();
            const io = getIO();
            io.sockets.emit('cancelSchedule', { monhoc });
            reslove({
                status: 'Success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const themCuocHop = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            console.log(data);
            if (data.member.length >= 1) {
                let ghichu = 'Không có nhắc nhở';
                if (data.ghiChu != '') {
                    ghichu = data.ghiChu;
                }
                const getTietHoc = (startDate, endDate) => {
                    const startHour = parseInt(startDate.split('T')[1].split(':')[0]);
                    const startMinute = parseInt(startDate.split('T')[1].split(':')[1]);

                    const startTotalMinutes = startHour * 60 + startMinute;

                    const convertToTietHoc = (totalMinutes) => {
                        if (totalMinutes >= 390 && totalMinutes <= 540) return '1-3';
                        if (totalMinutes >= 550 && totalMinutes <= 700) return '4-6';
                        if (totalMinutes >= 750 && totalMinutes <= 900) return '7-9';
                        if (totalMinutes >= 910 && totalMinutes <= 1060) return '10-12';
                        return '';
                    };

                    const tietHoc = convertToTietHoc(startTotalMinutes); // Sử dụng kết quả này cho cả startTietHoc và endTietHoc

                    return tietHoc;
                };

                const tietHoc = getTietHoc(data.startDate, data.endDate);
                console.log(tietHoc);

                const appointment = await HocPhan.findOne({ maLopHocPhan: '000000' });
                if (appointment) {
                    const startDateUTC = moment.utc(data.startDate).format(); // Chuyển đổi sang UTC
                    const endDateUTC = moment.utc(data.endDate).format(); // Chuyển đổi sang UTC
                    appointment.thongTinLich.push({
                        title: data.title,
                        startDate: startDateUTC,
                        endDate: endDateUTC,
                        phongHoc: data.phongHoc,
                        tenGV: data.member[0],
                        tietHoc: tietHoc, // lưu tiết học tại đây
                        ghiChu: ghichu,
                    });
                    await appointment.save(); // Lưu lại thông tin lịch họp
                }
                const promises = data.member.map(async (value) => {
                    const GV = await GiaoVien.find({ 'ThongTinCaNhan.hoTenGV': value });
                    return GV;
                });
                let DSGV = (await Promise.all(promises)).flatMap((item) => item);
                DSGV = DSGV.map(async (gv) => {
                    if (!gv.ThongTinGiangDay.lichDay.includes('000000')) {
                        gv.ThongTinGiangDay.lichDay.push('000000');
                        await gv.save(); // Lưu lại thông tin lịch của mỗi giáo viên
                    }
                    return gv;
                });
                await Promise.all(DSGV);
                const DSHP = await HocPhan.find();
                const io = getIO();
                io.sockets.emit('createAppointment', DSHP);
                reslove({
                    status: 'Success',
                    message: 'Thêm cuộc họp thành công',
                });
            } else {
                reslove({
                    status: 'Success',
                    message: 'Bạn chưa chọn thành viên cho cuộc họp',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const taoThongBao = async (data) => {
    return new Promise(async (reslove, reject) => {
        const { tenThongBao, chiTiet, ngayTao, danhCho } = data.body;
        try {
            const convertedStr = slugify(unidecode(tenThongBao), { lower: true });
            let link = 'không có file đính kèm';
            if (
                data.files &&
                data.files['dinhKem'] &&
                Array.isArray(data.files['dinhKem']) &&
                data.files['dinhKem'].length > 0
            ) {
                link = data.files['dinhKem'][0].path;
            }
            const thongBaoNew = await new ThongBao({
                tenThongBao,
                slug: convertedStr,
                chiTiet,
                ngayTao,
                danhCho,
                dinhKem: link,
            });
            await thongBaoNew.save();
            const io = getIO();
            io.sockets.emit('newNotify', { thongBaoNew });
            reslove({
                status: 'Success',
                message: 'Tạo thông báo thành công',
                thongBaoNew,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const xoaThongBao = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const rs = await ThongBao.findOneAndDelete({ slug: data.slug });
            if (rs) {
                const DSTB = await ThongBao.find();
                const io = getIO();
                io.sockets.emit('deleteNotify', DSTB);
                reslove({
                    status: 'Success',
                    message: 'Xóa thông báo thành công',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const xoaAllThongBao = async () => {
    try {
        await ThongBao.deleteMany().skip(11);
        reslove({
            status: 'Success',
            message: 'Xóa thông báo thành công',
        });
    } catch (error) {
        throw new Error('Không thể xóa thông báo: ' + error.message);
    }
};

const xacNhanYeuCau = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const GV = await GiaoVien.findOne({ 'ThongTinCaNhan.hoTenGV': data.tenGV });
            const dataId = data._id.toString();
            if (!data.tinnhanphanhoi) {
                data.tinnhanphanhoi = 'Không có tin nhắn phản hồi';
            }
            GV.ThongTinGiangDay.yeuCau.map((value) => {
                const valueIdString = value._id.toString();
                if (valueIdString === dataId) {
                    value.trangthaixacnhan = true;
                    value.tinnhanphanhoi = data.tinnhanphanhoi;
                    return value;
                }
            });

            await GV.save();
            const DS = await GiaoVien.find();

            const io = getIO();
            io.sockets.emit('confirmRequest', DS);
            reslove({
                status: 'Success',
                message: 'Phản hồi yêu cầu thành công',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const datLaiMatKhau = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const tk = await TaiKhoan.findOne({ taikhoan: data.taiKhoan });
            if (tk) {
                const hash = bcrypt.hashSync(tk.taikhoan, 10);
                tk.matkhau = hash;
                await tk.save();
            }

            const DSTK = await TaiKhoan.find();
            if (DSTK) {
                const taikhoan = DSTK.map((value) => {
                    if (value.loaitaikhoan !== 'admin') {
                        const tk = {
                            taiKhoan: value.taikhoan,
                            loaiTaiKhoan: value.loaitaikhoan,
                            matKhau: value.matkhau,
                            ngayTao: value.ngaytao,
                        };
                        return tk;
                    } else {
                        const tk = {
                            taiKhoan: value.taikhoan,
                            loaiTaiKhoan: 'khoa',
                            matKhau: value.matkhau,
                            ngayTao: value.ngaytao,
                        };
                        return tk;
                    }
                });
                const io = getIO();
                io.sockets.emit('resetPassword', taikhoan);
            }
            reslove({
                status: 'Success',
                message: 'Đặt lại mật khẩu thành công',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const xoaTaiKhoan = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const deleteAcc = await TaiKhoan.findOneAndDelete({ taikhoan: data.taiKhoan });

            if (deleteAcc) {
                const DSTK = await TaiKhoan.find();

                const taikhoan = DSTK.map((value) => {
                    if (value.loaitaikhoan !== 'admin') {
                        const tk = {
                            taiKhoan: value.taikhoan,
                            loaiTaiKhoan: value.loaitaikhoan,
                            matKhau: value.matkhau,
                            ngayTao: value.ngaytao,
                        };
                        return tk;
                    } else {
                        const tk = {
                            taiKhoan: value.taikhoan,
                            loaiTaiKhoan: 'khoa',
                            matKhau: value.matkhau,
                            ngayTao: value.ngaytao,
                        };
                        return tk;
                    }
                });
                const io = getIO();
                io.sockets.emit('deleteAccount', taikhoan);
            }

            reslove({
                status: 'Success',
                message: 'Xóa tài khoản thành công',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    themPhongHoc,
    capNhatPhongHoc,
    baoTriPhongHoc,
    getPhongHocPhuHop,
    chuyenLichHoc,
    themLichHoc,
    capNhatLichHoc,
    tamHoanLichHoc,
    themCuocHop,
    taoThongBao,
    xoaThongBao,
    xoaAllThongBao,
    xacNhanYeuCau,
    datLaiMatKhau,
    xoaTaiKhoan,
};
