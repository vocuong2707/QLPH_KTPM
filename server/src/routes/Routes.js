const userRouter = require('./UserRouter');
const hocPhanRouter = require('./HocPhanRouter');
const sinhVienRouter = require('./SinhVienRouter');
const giaoVienRouter = require('./GiaoVienRouter');
const adminRouter = require('./AdminRouter');

const routes = (app) => {
    app.use('/auth', userRouter);
    app.use('/course', hocPhanRouter);
    app.use('/student', sinhVienRouter);
    app.use('/teacher', giaoVienRouter);
    app.use('/admin', adminRouter);
};

module.exports = routes;
