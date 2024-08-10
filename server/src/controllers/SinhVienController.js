const SinhVien = require('../services/SinhVienService');

const themSinhVien = async (req, res) => {
    try {
        const student = await SinhVien.themSinhVien(req.body);
        res.status(200).json({
            student,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSVTheoMaSV = async (req, res) => {
    try {
        const SV = await SinhVien.getSVTheoMaSV(req.body);
        res.status(200).json({
            SV,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    themSinhVien,
    getSVTheoMaSV,
};
