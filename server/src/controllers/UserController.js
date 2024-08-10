const userService = require('../services/UserService');
const bcrypt = require('bcrypt');
const jwt = require("../configs/jwt");

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const response = await userService.changePassword(req.body);
        res.status(200).json({
            response,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        }

        const data = await userService.userLogin(req.body);
        console.log("data:" , data);
        if(data.data.status !== 'fail') {
             // Giả định rằng userService.userLogin trả về thông tin người dùng nếu đăng nhập thành công
            // Tạo payload cho JWT
            // const payload = { id: data.id, username: data.username };

            // Tạo token với thời gian hết hạn là 7 ngày
            console.log("test" + data.data.checkUser.loaitaikhoan);
            const token = jwt.generateToken(
                { user_id : data.data.checkUser._id , role : data.data.checkUser.loaitaikhoan},
                "7d"
              );            
              return res.status(200).json({
                status: 'OK',
                message: 'Login successful',
                dataLogin: data,
                token: token,
            });
        } else {
            return res.status(200).json({
                status: 'ERR',
                message: 'Invalid username or password',
            });
        }
        // return res.status(200).json({
        //     dataLogin: data,
        // });
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createUser,
    changePassword,
    userLogin,
};
