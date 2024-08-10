import React, { useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './PhongHoc.scss';

import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');

const { Content } = Layout;

type PhongType = {
    id: string;
    tenPhong: string;
    sucChua: string;
    trangThai: string;
    tenNha: string;
    loaiPhong: {
        id: string;
        tenLoai: string;
        thietBi: {
            id: string;
            tenThietBi: string;
        }[];
    };
};

type ParamType = {
    loaiphong: string;
};

const PhongHoc: React.FC = () => {
    const { loaiphong } = useParams<ParamType>();

    let Loai = '';
    if (loaiphong === 'lythuyet') {
        Loai = 'Phòng Lý Thuyết';
    }
    if (loaiphong === 'thuchanh') {
        Loai = 'Phòng Thực Hành';
    }
    if (loaiphong === 'hoitruong') {
        Loai = 'Phòng Hội Trường';
    }

    const [isRerender, setIsRerender] = useState(false);

    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    socket.on('addClassroom', (DSPH: any) => {
        data.DanhSachPhongHoc = DSPH;
        localStorage.setItem('myDataKey', JSON.stringify(data));
        setIsRerender(!isRerender);
    });

    const danhSachPhongTheoLoai = (danhSachPhong: PhongType[], Loai: string) => {
        return danhSachPhong.filter((phong) => phong.loaiPhong.tenLoaiPhong === Loai);
    };

    const ketQua = danhSachPhongTheoLoai(data.DanhSachPhongHoc, Loai);

    const nhaPhongMap: Record<string, PhongType[]> = {};
    ketQua.forEach((phong) => {
        if (!nhaPhongMap[phong.tenNha]) {
            nhaPhongMap[phong.tenNha] = [];
        }
        nhaPhongMap[phong.tenNha].push(phong);
    });
    ///
    const [showForm, setShowForm] = useState(false);
    const [phong, setPhong] = useState({
        maPhong: '',
        sucChua: '',
        trangThai: '1',
        tenNha: '',
        loaiPhong: {
            tenLoaiPhong: Loai,
            thietBi: [{ soLuong: '', tenThietBi: '' }],
        },
    });

    // Xử lí change input
    const handleInputChange = (field, value) => {
        if (field === 'sucChua') {
            // Kiểm tra giá trị nhập của sức chứa có phải là số không
            if (!/^\d+$/.test(value) && value !== '') {
                return;
            }
        }
        setPhong({ ...phong, [field]: value });
    };

    // Xử lý + add input thiết bị
    const handleAddButtonClick = () => {
        setPhong({
            ...phong,
            loaiPhong: {
                ...phong.loaiPhong,
                thietBi: [...phong.loaiPhong.thietBi, { tenThietBi: '', soLuong: '' }],
            },
        });
    };

    // Xử lý  ô input "Tên thiết bị" và "Số lượng" thay đổi
    const handleThietBiInputChange = (index, field, value) => {
        const updatedThietBi = [...phong.loaiPhong.thietBi];
        updatedThietBi[index][field] = value;
        setPhong({
            ...phong,
            loaiPhong: {
                ...phong.loaiPhong,
                thietBi: updatedThietBi,
            },
        });
    };

    // Xử lý sự kiện khi form được submit
    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        setShowForm(false);
        console.log(phong);
        try {
            const response = await fetch('http://localhost:3001/admin/add-classroom', {
                method: 'POST',
                body: JSON.stringify(phong),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = response.json();
                data.then((result) => {
                    if (result.classroom.status === 'fail') {
                        toast.error(result.classroom.message);
                    } else {
                        toast.success(result.classroom.message);
                        setPhong({
                            maPhong: '',
                            sucChua: '',
                            trangThai: '1',
                            tenNha: '',
                            loaiPhong: {
                                tenLoaiPhong: Loai,
                                thietBi: [{ soLuong: '', tenThietBi: '' }],
                            },
                        });
                    }
                });
            } else {
                console.log('fail');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleShow = () => {
        setShowForm(!showForm);
        setPhong({
            maPhong: '',
            sucChua: '',
            trangThai: '1',
            tenNha: '',
            loaiPhong: {
                tenLoaiPhong: Loai,
                thietBi: [],
            },
        });
    };

    useEffect(() => {}, [isRerender]);

    return (
        <>
            <AdminNavbar />
            <ToastContainer />
            <Layout className="body__content" style={{ minHeight: 100 + 'vh' }}>
                <AdminSider />
                <Layout className="phonghoc_content">
                    <Content>
                        <div className="loaiphong">{Loai}</div>
                        <div>
                            <Button onClick={handleShow} type="primary" style={{ marginLeft: '30px' }}>
                                Thêm phòng
                            </Button>
                        </div>
                        <div className="list__nha">
                            {Object.keys(nhaPhongMap).map((tenNha, key) => (
                                <div key={key} className="phong">
                                    <h3>{`Nhà ${tenNha}`}</h3>
                                    <div className="list_phong">
                                        {nhaPhongMap[tenNha].map((phong, key2) => (
                                            <Link key={key2} to={`/admin/phonghoc/${loaiphong}/${phong.maPhong}`}>
                                                <div className="item">Phòng {phong.maPhong}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {showForm ? (
                            <div className="Phong_container_bg">
                                <div className="Phong_container">
                                    <div className="Phong_button">
                                        <div className="Phong_close-button" onClick={handleShow}>
                                            x
                                        </div>
                                    </div>
                                    <form>
                                        <div className="form-input">
                                            <label htmlFor="">Tên Phòng:</label>
                                            <input
                                                type="text"
                                                placeholder="Tên phòng"
                                                value={phong.maPhong}
                                                onChange={(e) => handleInputChange('maPhong', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-input">
                                            <label htmlFor="">Sức Chứa:</label>
                                            <input
                                                type="text"
                                                placeholder="Sức Chứa"
                                                value={phong.sucChua}
                                                onChange={(e) => handleInputChange('sucChua', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-input">
                                            <label htmlFor="">Tên Nhà:</label>
                                            <input
                                                type="text"
                                                placeholder="Tên Nhà"
                                                value={phong.tenNha}
                                                onChange={(e) => handleInputChange('tenNha', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-input">
                                            <label htmlFor="">Loại Phòng:</label>
                                            <select
                                                value={phong.loaiPhong.tenLoaiPhong}
                                                onChange={(e) => handleInputChange('tenLoaiPhong', e.target.value)}
                                            >
                                                <option value={Loai}>{Loai}</option>
                                            </select>
                                        </div>

                                        <div className="form-input">
                                            <label htmlFor="">Thêm thiết bị:</label>
                                            <Button
                                                type="primary"
                                                onClick={handleAddButtonClick}
                                                className="Phong_themThietBi"
                                            >
                                                +
                                            </Button>
                                        </div>

                                        {phong.loaiPhong.thietBi.map((thietBi, index) => (
                                            <div key={index} className="input_ThietBi">
                                                <div className="input_ThietBi_form">
                                                    <label className="">Tên thiết bị</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Tên thiết bị"
                                                        value={thietBi.tenThietBi}
                                                        onChange={(e) =>
                                                            handleThietBiInputChange(
                                                                index,
                                                                'tenThietBi',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="input_ThietBi_form" style={{ marginLeft: '30px' }}>
                                                    <label htmlFor="" style={{ marginTop: '7px' }}>
                                                        Số Lượng
                                                    </label>
                                                    <input
                                                        className="soluong"
                                                        type="text"
                                                        placeholder="Số lượng"
                                                        value={thietBi.soLuong}
                                                        onChange={(e) =>
                                                            handleThietBiInputChange(index, 'soLuong', e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <Button
                                            type="primary"
                                            onClick={handleFormSubmit}
                                            style={{ margin: '15px', width: '150px', height: '35px' }}
                                        >
                                            Thêm
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    );
};

export default PhongHoc;
