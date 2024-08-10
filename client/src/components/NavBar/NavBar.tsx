import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/tieude4.png';
import avt from '../../assets/images/avt4.jpg';
import './navbar.scss';
import { ToastContainer, toast } from 'react-toastify';

const NavBar: React.FC = () => {
    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    const [modalStatus, setModalStatus] = useState(false);
    const [changePass, setChangePass] = useState(false);

    const [username, setUsername] = useState(data.checkUser.taikhoan);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const navigate = useNavigate();

    const handleModal = () => {
        setModalStatus(!modalStatus);
    };

    const handleLogout = () => {
        const isDataExist = localStorage.getItem('myDataKey') !== null;
        // Nếu dữ liệu tồn tại, hãy xóa nó
        if (isDataExist) {
            localStorage.removeItem('myDataKey');
        }
        navigate('/');
    };

    const handleShowChangePass = () => {
        setChangePass(!changePass);
        setModalStatus(false);
    };

    const handleCloseForm = () => {
        setChangePass(false);
    };

    const handleSubmitChangePass = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/auth/change-password', {
                method: 'POST',
                body: JSON.stringify({ username, oldPassword, newPassword, confirmNewPassword }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.success('Đổi mật khẩu thành công');
                setChangePass(false);
            } else {
                toast.error('Đổi mật khẩu thất bại');
            }
        } catch (error) {
            toast.error('Lỗi kết nối');
        }
    };

    return (
        <div className="navbar-component">
            <ToastContainer />
            <div className="logo">
                <Link to="/home">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="search-bar">
                <input className="search-input" type="text" placeholder="Tìm kiếm..." />
            </div>
            <div className="menu">
                <ul className="ul">
                    <Link className="dir" to="/home">
                        <li className="li-menu">
                            <i className="fa-solid fa-house-chimney"></i>
                            <span>Trang Chủ</span>
                        </li>
                    </Link>

                    <Link className="dir" to="/home/thongbao">
                        <li className="li-menu">
                            <i className="fa-solid fa-message"></i>
                            <span>Thông báo</span>
                        </li>
                    </Link>

                    <Link className="dir" to="/home/lichhoc">
                        <li className="li-menu">
                            <i className="fa-solid fa-calendar-days"></i>
                            <span>{data.checkUser.loaitaikhoan === 'sinhvien' ? 'Lịch Học' : 'Lịch Dạy'}</span>
                        </li>
                    </Link>

                    {data.checkUser.loaitaikhoan === 'giaovien' ? (
                        <Link className="dir" to="/home/yeucau">
                            <li className="li-menu">
                                <i className="fa-solid fa fa-calendar-times-o"></i>
                                Yêu Cầu
                            </li>
                        </Link>
                    ) : (
                        <></>
                    )}

                    <li className="infomation">
                        <div className="avt">
                            {data.data.ThongTinCaNhan.anhDaiDien != null ? (
                                <img src={data.data.ThongTinCaNhan.anhDaiDien} />
                            ) : (
                                <img src={avt} alt="" />
                            )}

                            <span onClick={handleModal}>
                                {data.checkUser.loaitaikhoan === 'sinhvien'
                                    ? data.data.ThongTinCaNhan.hoTenSV
                                    : data.data.ThongTinCaNhan.hoTenGV}
                                <i className={`fa-solid fa-chevron-down ${modalStatus == true ? 'transform' : ''}`}></i>
                            </span>
                        </div>
                        <div className={`modal-logout ${modalStatus == true ? '' : 'disable-div'}`}>
                            <ul>
                                {data.checkUser.loaitaikhoan === 'sinhvien' ? (
                                    <li onClick={() => navigate('/home/chitietsinhvien')}>
                                        <span>Thông tin cá nhân</span>
                                    </li>
                                ) : (
                                    <></>
                                )}

                                <Link
                                    className="dangki-hocphan"
                                    style={{ width: 100 + '%', padding: 0 + '!important', margin: 0 }}
                                    to="/home/dangkihocphan"
                                >
                                    <li>
                                        <span>Đăng kí học phần</span>
                                    </li>
                                </Link>

                                <li onClick={handleShowChangePass}>
                                    <span>Đổi mật khẩu</span>
                                </li>

                                <li onClick={handleLogout}>
                                    <span>Đăng xuất</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            {changePass ? (
                <>
                    <div className="modalshowChangePass">
                        <div className="container">
                            <div className="row vh-100 justify-content-center align-items-center ">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="text-center mt-2">
                                                Đổi mật khẩu
                                                <button
                                                    type="button"
                                                    className="close-form-btn"
                                                    onClick={handleCloseForm}
                                                >
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmitChangePass}>
                                                <div className="form-group">
                                                    <label htmlFor="username">Tên người dùng</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        //required
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Mật khẩu hiện tại</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        value={oldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="newPassword">Mật khẩu mới</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="newPassword"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="confirmPassword"
                                                        value={confirmNewPassword}
                                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    Đổi mật khẩu
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default NavBar;
