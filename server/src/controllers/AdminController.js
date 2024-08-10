const Admin = require('../services/AdminService');

const themPhongHoc = async (req, res) => {
    try {
        const classroom = await Admin.themPhongHoc(req.body);
        res.status(200).json({
            classroom,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const capNhatPhongHoc = async (req, res) => {
    try {
        const classroom = await Admin.capNhatPhongHoc(req.body);
        res.status(200).json({
            classroom,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const baoTriPhongHoc = async (req, res) => {
    try {
        const classroom = await Admin.baoTriPhongHoc(req.body);
        res.status(200).json({
            classroom,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPhongHocPhuHop = async (req, res) => {
    try {
        const move = await Admin.getPhongHocPhuHop(req.body);
        res.status(200).json({
            message: 'Chuyển lịch học thành công',
            move,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const chuyenLichHoc = async (req, res) => {
    try {
        const move = await Admin.chuyenLichHoc(req.body);
        res.status(200).json(move);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const themLichHoc = async (req, res) => {
    try {
        const update = await Admin.themLichHoc(req.body);
        res.status(200).json({
            message: 'Cập nhật thành công',
            update,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const capNhatLichHoc = async (req, res) => {
    try {
        const update = await Admin.capNhatLichHoc(req.body);
        res.status(200).json({
            message: 'Cập nhật thành công',
            update,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const tamHoanLichHoc = async (req, res) => {
    try {
        const cancel = await Admin.tamHoanLichHoc(req.body);
        res.status(200).json({
            message: 'Đã tạm hoãn lịch học',
            cancel,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const themCuocHop = async (req, res) => {
    try {
        const appointment = await Admin.themCuocHop(req.body);
        res.status(200).json({
            appointment,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const taoThongBao = async (req, res) => {
    try {
        const notify = await Admin.taoThongBao(req);
        res.status(200).json({
            notify,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const xoaThongBao = async (req, res) => {
    try {
        const notify = await Admin.xoaThongBao(req.body);
        res.status(200).json({
            notify,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const xoaAllThongBao = async (req, res) => {
    try {
        const notify = await Admin.xoaAllThongBao();
        res.status(200).json({
            notify,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const xacNhanYeuCau = async (req, res) => {
    try {
        const request = await Admin.xacNhanYeuCau(req.body);
        res.status(200).json({
            request,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const datLaiMatKhau = async (req, res) => {
    try {
        const reset = await Admin.datLaiMatKhau(req.body);
        res.status(200).json({
            reset,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const xoaTaiKhoan = async (req, res) => {
    try {
        const reset = await Admin.xoaTaiKhoan(req.body);
        res.status(200).json({
            reset,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
