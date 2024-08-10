import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/tieude4.png';
import './AdminNavbar.scss';

const AdminNavbar: React.FC = () => {

    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);

    const [modalStatus, setModalStatus] = useState(false);
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

    return (
        <div className="admin_navbar-component">
            <div className="admin_logo">
                <img src={logo} alt="" />
            </div>
            <div className="admin_search-bar">
                <input className="admin_search-input" type="text" placeholder="Tìm kiếm..." />
            </div>
            <div className="admin_menu">
                <ul className="admin_ul">
                    <li className="admin_infomation">
                        <div className="admin_avt">
                            <span onClick={handleModal}>
                                {thongtin.checkUser.taikhoan}
                                <i className={`fa-solid fa-chevron-down ${modalStatus == true ? 'admin_transform' : ''}`}></i>
                            </span>
                        </div>
                        <div className={`admin_modal-logout ${modalStatus == true ? '' : 'disable-div'}`}>
                            <ul>
                                <li>
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
        </div>
    );
};

export default AdminNavbar;
