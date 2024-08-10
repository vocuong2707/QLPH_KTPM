import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logout from '../../../assets/images/AdminLogout.png';
import './AdminSider.scss';
// import { MonHoc } from '../../../../DataSample';

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminSider: React.FC = () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Xác định key tương ứng với đường dẫn hiện tại
    const currentKey = location.pathname;

    // Sét selectedKeys bằng key tương ứng với đường dẫn
    if (selectedKeys[0] !== currentKey) {
        setSelectedKeys([currentKey]);
    }

    // Khai báo trạng thái để mở/collapse submenu
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    // Xử lý khi click vào submenu cha
    const handleSubmenuClick = (key: string) => {
        if (openKeys.includes(key)) {
            setOpenKeys([]);
        } else {
            setOpenKeys([key]);
            //setSelectedKeys([key]);
        }
    };

    // Xử lý khi click vào mục con trong submenu
    const handleSubmenuItemSelect = (key: string) => {
        // Ẩn submenu bằng cách xóa tất cả các key của submenu
        console.log(key);
        setOpenKeys([]);
    };

    const handleLogout = () => {
        const isDataExist = localStorage.getItem('myDataKey') !== null;
        // Nếu dữ liệu tồn tại, hãy xóa nó
        if (isDataExist) {
            localStorage.removeItem('myDataKey');
        }
        navigate('/');
    };

    function removeVietnameseTones(str: string) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
        str = str.replace(/Đ/g, 'D');
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
        str = str.replace(/\u02C6|\u0306|\u031B/g, '');
        str = str.split(' ').join('-');
        return str.toLowerCase();
    }

    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);
    const uniqueMaLopHocPhan: string[] = [];

    return (
        <Sider className="sider" theme="dark">
            <Menu mode="vertical" theme="dark" selectedKeys={selectedKeys} openKeys={openKeys}>
                <Menu.Item key="/admin/home">
                    <Link to="/admin/home">Trang chủ</Link>
                </Menu.Item>
                <SubMenu
                    key="phonghoc"
                    title="Quản lí phòng học"
                    onTitleClick={() => handleSubmenuClick('phonghoc')}
                    className="menu"

                    //onOpenChange={handleSubmenuClick} // Xử lý khi submenu mở/đóng
                >
                    <Menu.Item key="/admin/phonghoc/lythuyet" onClick={() => handleSubmenuItemSelect('lythuyet')}>
                        <Link to="/admin/phonghoc/lythuyet">Phòng lý thuyết</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/phonghoc/thuchanh" onClick={() => handleSubmenuItemSelect('thuchanh')}>
                        <Link to="/admin/phonghoc/thuchanh">Phòng thực hành</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/phonghoc/hoitruong" onClick={() => handleSubmenuItemSelect('hoitruong')}>
                        <Link to="/admin/phonghoc/hoitruong">Hội trường</Link>
                    </Menu.Item>
                </SubMenu>
                {/* Học phần */}
                <SubMenu
                    key="quanlyhocphan"
                    title="Quản lý học phần"
                    onTitleClick={() => handleSubmenuClick('quanlyhocphan')}
                    className="uanlyhocphan-submenu"
                    style={{ maxHeight: '50px', overflowY: 'auto' }}
                >
                    {data.DanhSachHocPhan.map((item: any) => {
                        if (!uniqueMaLopHocPhan.includes(item.maLopHocPhan)) {
                            uniqueMaLopHocPhan.push(item.maLopHocPhan);
                            return (
                                <Menu.Item
                                    key={`/admin/monhoc/${removeVietnameseTones(item.maLopHocPhan)}`}
                                    onClick={() => handleSubmenuItemSelect(item.maLopHocPhan)}
                                >
                                    <Link to={`/admin/monhoc/${removeVietnameseTones(item.maLopHocPhan)}`}>
                                        {item.tenMonHoc}
                                    </Link>
                                </Menu.Item>
                            );
                        } else {
                            return null; // Không render môn học nếu mã lớp học phần đã tồn tại
                        }
                    })}
                </SubMenu>
                <SubMenu
                    key="quanlitaikhoan"
                    title="Quản lí tài khoản"
                    onTitleClick={() => handleSubmenuClick('quanlitaikhoan')}
                    className="menu"

                    //onOpenChange={handleSubmenuClick} // Xử lý khi submenu mở/đóng
                >
                    <Menu.Item key="/admin/quanlitaikhoan/sinhvien" onClick={() => handleSubmenuItemSelect('sinhvien')}>
                        <Link to="/admin/quanlitaikhoan/sinhvien">Sinh viên</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/quanlitaikhoan/giaovien" onClick={() => handleSubmenuItemSelect('giaovien')}>
                        <Link to="/admin/quanlitaikhoan/giaovien">Giảng viên</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/quanlitaikhoan/khoa" onClick={() => handleSubmenuItemSelect('khoa')}>
                        <Link to="/admin/quanlitaikhoan/khoa">Khoa</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="yeucau"
                    title="Yêu cầu"
                    onTitleClick={() => handleSubmenuClick('yeucau')}
                    className="menu"

                    //onOpenChange={handleSubmenuClick} // Xử lý khi submenu mở/đóng
                >
                    <Menu.Item key="/admin/yeucau/choduyet" onClick={() => handleSubmenuItemSelect('choduyet')}>
                        <Link to="/admin/yeucau/choduyet">Yêu cầu chờ</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/yeucau/daduyet" onClick={() => handleSubmenuItemSelect('daduyet')}>
                        <Link to="/admin/yeucau/daduyet">Yêu cầu đã duyệt</Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item key="/admin/thongbao">
                    <Link to="/admin/thongbao">Thông báo</Link>
                </Menu.Item>
            </Menu>

            <div className="setting">
                <div className="admin_item" onClick={handleLogout}>
                    Đăng xuất
                    <span style={{ color: 'white' }}>
                        <img src={logout} alt="" style={{ height: '10px', width: '10px' }} />
                    </span>
                </div>
            </div>
        </Sider>
    );
};

export default AdminSider;
