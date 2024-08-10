const TaiKhoan = require('../models/ModalTaiKhoan');
const SinhVien = require('../models/ModalSinhVien');
const HocPhan = require('../models/ModalHocPhan');
const GiaoVien = require('../models/ModalGiaovien');
const ThongBao = require('../models/ModalThongBao');

const bcrypt = require('bcrypt');
const PhongHoc = require('../models/ModalPhongHoc');
const { getIO } = require('../configs/Socket');

const createUser = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(userData);
            const existingUser = await TaiKhoan.findOne({
                taikhoan: userData.taiKhoan,
            });

            if (existingUser) {
                resolve({
                    status: 'fail',
                    message: 'Đã tồn tại người dùng có mã ' + userData.taiKhoan,
                });
            } else {
                const hash = bcrypt.hashSync(userData.matKhau, 10);
                const dateCreate = new Date().toLocaleString();
                const newUser = {
                    taikhoan: userData.taiKhoan,
                    matkhau: hash,
                    ngaytao: dateCreate,
                    loaitaikhoan: userData.loaiTaiKhoan,
                };
                const user = new TaiKhoan(newUser);
                await user.save();

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
                io.sockets.emit('createAccount', taikhoan);

                resolve({
                    status: 'success',
                    message: 'Tạo tài khoản thành công',
                    data: user,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const changePassword = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { username, oldPassword, newPassword, confirmNewPassword } = data;
        try {
            const checkUser = await TaiKhoan.findOne({
                taikhoan: username,
            });
            if (checkUser === null) {
                resolve({
                    status: 'fail',
                    message: 'Tên đăng nhập không tồn tại',
                });
                return;
            }
            const comparePassword = bcrypt.compareSync(oldPassword, checkUser.matkhau);

            if (!comparePassword) {
                resolve({
                    status: 'fail',
                    message: 'Mật khẩu không chính xác',
                });
                return;
            }

            if (newPassword !== confirmNewPassword) {
                resolve({
                    status: 'fail',
                    message: 'Nhập lại mật khẩu không đúng',
                });
                return;
            }

            const hashedPassword = bcrypt.hashSync(newPassword, 10);

            await TaiKhoan.updateOne({ taikhoan: username }, { $set: { matkhau: hashedPassword } });

            resolve({
                status: 'success',
                message: 'Đổi mật khẩu thành công',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const userLogin = async (dataLogin) => {
    return new Promise(async (reslove, reject) => {
        const { username, password } = dataLogin;
        try {
            const checkUser = await TaiKhoan.findOne({
                taikhoan: username,
            });

            if (checkUser === null) {
                reslove({
                    data: {
                        status: 'fail',
                        message: 'Tên đăng nhập không tồn tại',
                        path: '',
                    },
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.matkhau);

            if (!comparePassword) {
                reslove({
                    data: {
                        status: 'fail',
                        message: 'Mật khẩu không chính xác',
                        path: '',
                    },
                });
            } else {
                if (checkUser.loaitaikhoan === 'admin') {
                    const DSHP = await HocPhan.find();
                    const DSTB = await ThongBao.find();
                    const DSPH = await PhongHoc.find();
                    const DSTK = await TaiKhoan.find();
                    const DSGV = await GiaoVien.find();
                    if (!DSHP || !DSTB || !DSPH || !DSTK) {
                        reslove({
                            status: 'success',
                            message: 'Đăng nhập thành công, Wellcome admin !!',
                            DanhSachHocPhan: 'khong tim thay hoc phan',
                            DanhSachThongBao: 'khong tim thay thong bao',
                            DanhSachThongBao: 'khong tim thay phong hoc',
                            checkUser,
                            path: '/admin/home',
                        });
                    } else {
                        if (DSTK) {
                            const modifiedDSTK = DSTK.map((value, key) => {
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
                            reslove({
                                data: {
                                    status: 'SUCCESS',
                                    message: 'Đăng nhập thành công, wellcome admin !!',
                                    DanhSachHocPhan: DSHP,
                                    DanhSachThongBao: DSTB,
                                    DanhSachPhongHoc: DSPH,
                                    DanhSachTaiKhoan: modifiedDSTK,
                                    DanhSachGiaoVien: DSGV,
                                    checkUser,
                                    path: '/admin/home',
                                },
                            });
                        }
                    }
                } else if (checkUser.loaitaikhoan === 'sinhvien') {
                    const data = await SinhVien.findOne({ 'ThongTinCaNhan.maSV': username });
                    const DSTB = await ThongBao.find({ danhCho: 'sinhvien' });
                    const DSTBALL = await ThongBao.find({ danhCho: 'tatca' });
                    const DSHP = await HocPhan.find();
                    const lich = [];
                    await Promise.all(
                        data.ThongTinHocPhan.data[0].dsHocPhan.map(async (value) => {
                            const hp = await HocPhan.findOne({ maLopHocPhan: value });
                            if (!hp) {
                                console.log('Không tìm thấy lịch của mã học phần là ' + value);
                            } else {
                                lich.push(hp);
                            }
                        }),
                    );
                    if (lich.length === 0) {
                        reslove({
                            data: {
                                status: 'SUCCESS',
                                message: 'Đăng nhập thành công',
                                checkUser,
                                data: data,
                                DanhSachThongBao: { DSTB, DSTBALL },
                                DanhSachHocPhan: DSHP,
                                lich: 'Không có lịch học trong học kì',
                                path: '/home',
                            },
                        });
                    } else {
                        reslove({
                            data: {
                                status: 'SUCCESS',
                                message: 'Đăng nhập thành công',
                                checkUser,
                                data: data,
                                DanhSachThongBao: { DSTB, DSTBALL },
                                DanhSachHocPhan: DSHP,
                                lich: lich,
                                path: '/home',
                            },
                        });
                    }
                } else if (checkUser.loaitaikhoan === 'giaovien') {
                    const data = await GiaoVien.findOne({ 'ThongTinCaNhan.maGV': username });
                    const DSTB = await ThongBao.find({ danhCho: 'giaovien' });
                    const DSTBALL = await ThongBao.find({ danhCho: 'tatca' });
                    const lich = [];
                    await Promise.all(
                        data.ThongTinGiangDay.lichDay.map(async (value) => {
                            const hp = await HocPhan.findOne({ maLopHocPhan: value });
                            if (!hp) {
                                console.log('Không tìm thấy lịch của mã học phần là ' + value);
                            } else {
                                lich.push(hp);
                            }
                        }),
                    );
                    if (lich.length === 0) {
                        reslove({
                            data: {
                                status: 'SUCCESS',
                                message: 'Đăng nhập thành công',
                                checkUser,
                                data: data,
                                DanhSachThongBao: { DSTB, DSTBALL },
                                lich: 'Không có lịch dạy trong học kì',
                                path: '/home',
                            },
                        });
                    } else {
                        reslove({
                            data: {
                                status: 'SUCCESS',
                                message: 'Đăng nhập thành công',
                                checkUser,
                                data: data,
                                DanhSachThongBao: { DSTB, DSTBALL },
                                lich: lich,
                                path: '/home',
                            },
                        });
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    changePassword,
    userLogin,
};
