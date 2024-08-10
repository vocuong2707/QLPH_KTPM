import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './page/Login/Login';
import Home from './page/Home/Home';
import { LichHoc } from './page/Home/LichHoc/LichHoc';
import { Thongbao } from './page/Home/ThongBao/Thongbao';
import AdminHome from './page/Admin/AdminHome';
import PhongHoc from './page/Admin/Phong/PhongHoc';
import QLThongbao from './page/Admin/QLThongBao/QLThongBao';
import ChiTietPhongHoc from './page/Admin/ChiTietPhong/ChiTietPhong';
import ChiTietMonHoc from './page/Admin/ChiTietMonHoc/ChiTietMonHoc';
import ChiTietTaiKhoan from './page/Admin/ChiTietTaiKhoan/ChiTietTaiKhoan';
import { ChiThietSinhVien } from './page/Home/ChiTietSinhVien/ChiTietSinhVien';
import FormYeuCau from './page/GiangVien/FormYeuCau/FormYeuCau';
import ChiTietThongBao from './page/Home/ThongBao/ChiTietThongBao/ChiTietThongBao';
import AdminChiTietThongBao from './page/Admin/QLThongBao/AdminChiTietThongBao/AdminChiTietThongBao';
import QuanLyYeuCau from './page/Admin/QLYeuCau/QuanLyYeuCau';
import DangKiHocPhan from './page/Home/DangKiHocPhan/DangKiHocPhan';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/dangkihocphan" element={<DangKiHocPhan />} />
                    <Route path="/home/chitietsinhvien" element={<ChiThietSinhVien />} />
                    <Route path="/home/thongbao" element={<Thongbao />} />
                    <Route path="/home/thongbao/:tenThongBao" element={<ChiTietThongBao />} />
                    <Route path="/home/lichhoc" element={<LichHoc />} />
                    <Route path="/admin/home" element={<AdminHome />} />
                    <Route path="/admin/lichhoc" element={<PhongHoc />} />
                    <Route path="/home/yeucau" element={<FormYeuCau />} />
                    {/*  */}
                    <Route path="/admin/thongbao" element={<QLThongbao />} />
                    <Route path="/admin/thongbao/:slug" element={<AdminChiTietThongBao />} />
                    {/*  */}
                    <Route path="/admin/phonghoc/:loaiphong" element={<PhongHoc />}></Route>
                    <Route path="/admin/phonghoc/:loaiphong/:toanha" element={<ChiTietPhongHoc />}></Route>
                    <Route path="/admin/monhoc/:maMonHoc" element={<ChiTietMonHoc />} />

                    <Route path="/admin/yeucau" element={<QuanLyYeuCau />} />
                    <Route path="/admin/yeucau/:loai" element={<QuanLyYeuCau />} />

                    {/*  */}
                    <Route path="/admin/quanlitaikhoan/:loaitaikhoan" element={<ChiTietTaiKhoan />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
