import React, { useState, useEffect } from 'react';
import { Layout, Input, Button } from 'antd';
import Modal from 'react-bootstrap/Modal';
import ButtonB from 'react-bootstrap/Button';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import './ChiTietTaiKhoan.scss';

import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');

const { Content } = Layout;
const { Search } = Input;
interface TaiKhoanData {
    id: number;
    taiKhoan: string;
    matKhau: string;
    loaiTaiKhoan: string;
    khoa: string;
}
type ParamType = {
    loaitaikhoan: string;
};

const ChiTietTaiKhoan: React.FC = () => {
    const [isRerender, setIsRerender] = useState(false);
    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);
    socket.on('resetPassword', (DSTK: any) => {
        thongtin.DanhSachTaiKhoan = DSTK;
        localStorage.setItem('myDataKey', JSON.stringify(thongtin));
        setIsRerender(!isRerender);
    });
    socket.on('deleteAccount', (taikhoan: any) => {
        thongtin.DanhSachTaiKhoan = taikhoan;
        localStorage.setItem('myDataKey', JSON.stringify(thongtin));
        setIsRerender(!isRerender);
    });
    socket.on('createAccount', (taikhoan: any) => {
        thongtin.DanhSachTaiKhoan = taikhoan;
        localStorage.setItem('myDataKey', JSON.stringify(thongtin));
        setIsRerender(!isRerender);
    });
    const TaiKhoan = thongtin.DanhSachTaiKhoan;
    const { loaitaikhoan } = useParams<ParamType>();

    const [data, setData] = useState<TaiKhoanData[]>([]);

    useEffect(() => {
        const taikhoan = TaiKhoan.filter((item: any) => item.loaiTaiKhoan === loaitaikhoan);
        if (taikhoan) {
            setData(taikhoan);
        }
    }, [loaitaikhoan, isRerender]);

    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState<string | null>(null);

    //////------------------------
    const [formData, setFormData] = useState({
        taiKhoan: '',
        matKhau: '',
        loaiTaiKhoan: 'sinhvien',
        khoa: '',
    });
    const [isKhoaDisabled, setIsKhoaDisabled] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Kiểm tra giá trị của trường "loaiTaiKhoan" và kích hoạt hoặc vô hiệu hóa trường "khoa"
        if (name === 'loaiTaiKhoan') {
            if (value === 'sinhvien') {
                setIsKhoaDisabled(false);
            } else {
                setIsKhoaDisabled(true);
            }
        }
    };

    const createAccount = async () => {
        const newAccount = {
            taiKhoan: formData.taiKhoan,
            matKhau: formData.matKhau,
            loaiTaiKhoan: formData.loaiTaiKhoan,
            khoa: formData.khoa,
        };

        try {
            const response = await fetch('http://localhost:3001/auth/create', {
                method: 'POST',
                body: JSON.stringify(newAccount),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = response.json();
                data.then((result) => {
                    if (result.user.status === 'fail') {
                        toast.error(result.user.message);
                    } else {
                        toast.success(result.user.message);
                        setFormData({
                            taiKhoan: '',
                            matKhau: '',
                            loaiTaiKhoan: 'sinhvien',
                            khoa: '',
                        });
                    }
                });
            } else {
                toast.error('Đã xảy ra vấn đề');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Đặt lại trạng thái form

        setIsKhoaDisabled(false);
    };
    //////-------------------------
    const [selectedItem, setSelectedItem] = useState<TaiKhoanData>();
    const selectItem = (item: TaiKhoanData) => {
        setSelectedItem(item);
    };

    const handleReset = (item: any) => {
        setShowModal(true);
        setActionType('reset');
        setSelectedItem(item);
    };
    const handleDelete = (item: any) => {
        setShowModal(true);
        setActionType('delete');
        setSelectedItem(item);
    };

    const confirmAction = async () => {
        if (actionType === 'delete') {
            console.log(selectedItem);
            try {
                const response = await fetch('http://localhost:3001/admin/delete-account', {
                    method: 'POST',
                    body: JSON.stringify(selectedItem),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    toast.success('Xóa tài khoản thành công');
                } else {
                    toast.error('Đã xảy ra vấn đề');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else if (actionType === 'reset') {
            console.log(selectedItem);
            try {
                const response = await fetch('http://localhost:3001/admin/reset-password', {
                    method: 'POST',
                    body: JSON.stringify(selectedItem),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    toast.success('Đặt lại mật khẩu thành công');
                } else {
                    toast.error('Đã xảy ra vấn đề');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // Đóng modal sau khi xử lí xóa hoặc đặt lại
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    let modalTitle, modalBody;

    if (actionType === 'delete') {
        modalTitle = 'Xác nhận xóa ?';
        modalBody = 'Bạn có chắc chắn muốn xóa tài khoản này không ?';
    } else if (actionType === 'reset') {
        modalTitle = 'Xác nhận đặt lại mật khẩu ?';
        modalBody = 'Mật khẩu khi được đặt lại sẽ trùng với tên tài khoản hiện tại! Bạn có chắc chắn muốn đặt lại ?';
    }

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TaiKhoanData[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const handleSearch = () => {
        const results = data.filter((item) => item.taiKhoan.includes(searchTerm));
        setSearchResults(results);
        setIsSearching(true);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setIsSearching(false);
    };

    return (
        <>
            <AdminNavbar />
            <ToastContainer />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout>
                    <Content>
                        <div className="TaiKhoan_content">
                            <div className="TaiKhoan_list">
                                <div className="TaiKhoan_noidung">
                                    <h2>{`Danh sách tài khoản ${loaitaikhoan === 'giaovien'
                                            ? 'Giảng viên'
                                            : loaitaikhoan === 'sinhvien'
                                                ? 'Sinh Viên'
                                                : 'Khoa'
                                        }`}</h2>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Search
                                            placeholder="Nhập mã tài khoản cần tìm kiếm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onSearch={handleSearch}
                                            style={{ marginRight: '8px', width: '600px', marginBottom: '20px' }} // Khoảng trống giữa input và button
                                        />
                                        {searchTerm && (
                                            <Button
                                                onClick={handleClearSearch}
                                                type="primary"
                                                danger
                                                style={{ marginBottom: '20px' }}
                                            >
                                                X
                                            </Button>
                                        )}
                                    </div>
                                    <div>
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tài khoản</th>
                                                        <th>Mật khẩu</th>
                                                        <th>Đặt lại mật khẩu</th>
                                                        <th>Xóa tài khoản</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(isSearching ? searchResults : data).map((item, i) => (
                                                        <tr
                                                            key={i}
                                                            className="TaiKhoan_item"
                                                            onClick={() => selectItem(item)}
                                                        >
                                                            <td>{i + 1}</td>
                                                            <td>{item.taiKhoan}</td>
                                                            <td>{item.matKhau}</td>
                                                            <td className="d-flex justify-content-center">
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => handleReset(item)}
                                                                >
                                                                    Đặt lại
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleDelete(item)}
                                                                >
                                                                    Xóa
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <Modal show={showModal} onHide={closeModal}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>{modalTitle}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>{modalBody}</Modal.Body>
                                                    <Modal.Footer>
                                                        <ButtonB variant="secondary" onClick={closeModal}>
                                                            Hủy
                                                        </ButtonB>
                                                        <ButtonB
                                                            variant={actionType === 'delete' ? 'danger' : 'primary'}
                                                            onClick={confirmAction}
                                                        >
                                                            {actionType === 'delete' ? 'Xóa' : 'Đặt lại'}
                                                        </ButtonB>
                                                    </Modal.Footer>
                                                </Modal>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="TaiKhoan_form">
                                <h5>Thêm tài khoản</h5>
                                <div>
                                    <label>Tài khoản:</label>
                                    <input
                                        type="text"
                                        name="taiKhoan"
                                        value={formData.taiKhoan}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Mật khẩu:</label>
                                    <input
                                        type="text"
                                        name="matKhau"
                                        value={formData.matKhau}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Loại tài khoản:</label>
                                    <select name="loaiTaiKhoan" value={formData.loaiTaiKhoan} onChange={handleChange}>
                                        <option value="sinhvien">Sinh viên</option>
                                        <option value="giaovien">Giảng viên</option>
                                        <option value="admin">Khoa</option>
                                    </select>
                                </div>
                                {/* <div>
                                    <label>Khoa:</label>
                                    <input
                                        type="text"
                                        name="khoa"
                                        value={formData.khoa}
                                        onChange={handleChange}
                                        disabled={isKhoaDisabled}
                                    />
                                </div> */}
                                <div>
                                    <button onClick={createAccount}>Thêm</button>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    );
};

export default ChiTietTaiKhoan;
