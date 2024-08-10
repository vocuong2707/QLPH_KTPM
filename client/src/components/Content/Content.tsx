import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from 'antd';

import './content.scss';
import avt from '../../assets/images/avt4.jpg';
import { Link } from 'react-router-dom';
import HomeGiangVien from '../../page/GiangVien/HomeGiangVien';
import ProgressChart from '../PointChart/ProgressChart';
import ResultChart from '../PointChart/ResultChart';

const Content: React.FC = () => {
    const [statusScroll, setStatusScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            const currentScrollPosition = window.scrollY;
            if (currentScrollPosition >= 300) {
                setStatusScroll(true);
            } else if (currentScrollPosition <= 200) {
                setStatusScroll(false);
            }
        });
    }, [statusScroll]);

    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    const columns = [
        { title: 'Môn học/học phần', dataIndex: 'tenMonHoc', key: 'tenMonHoc' },
        { title: 'Số tín chỉ', dataIndex: 'soTinChi', key: 'soTinChi' },
        { title: 'Số tiết', dataIndex: 'soBuoiHoc', key: 'soBuoiHoc' },
    ];

    const dataPoints = [
        { subject: 'Hệ quản trị cơ sở dữ liệu', yourScore: 5.5, avgScore: 5.7 },
        { subject: 'Lập Trình WWW', yourScore: 4.2, avgScore: 4.6 },
        { subject: 'Nhập môn dữ liệu lớn', yourScore: 7.4, avgScore: 5.8 },
        { subject: 'Phát triển ứng dụng', yourScore: 5.3, avgScore: 3.9 },
        { subject: 'Tiếng việt thực hành', yourScore: 9.5, avgScore: 9.5 },
    ];

    const mangMoi = data.lich.map(({ tenMonHoc, soTinChi, soBuoiHoc, maLopHocPhan }) => ({
        key: maLopHocPhan,
        tenMonHoc,
        soTinChi,
        soBuoiHoc,
    }));

    const ThongBaoSV = data.DanhSachThongBao.DSTB;
    const ThongBaoALL = data.DanhSachThongBao.DSTBALL;

    const tb = ThongBaoSV.concat(ThongBaoALL);
    return (
        <>
            {data.checkUser.loaitaikhoan === 'sinhvien' ? (
                <div className="content-coponent">
                    <div className="my-info">
                        <div className="title-info">
                            <span>Thông tin cá nhân</span>
                        </div>
                        <hr />
                        <div className="avt">
                            {data.data.ThongTinCaNhan.anhDaiDien != null ? (
                                <img src={data.data.ThongTinCaNhan.anhDaiDien} alt="" />
                            ) : (
                                <img src={avt} alt="" />
                            )}

                            <Link style={{ textDecoration: 'none' }} to="/home/chitietsinhvien">
                                <span>Xem chi tiết</span>
                            </Link>
                        </div>
                        <div className="text-info">
                            <ul>
                                <li>
                                    MSSV: <b>{data.data.ThongTinCaNhan.maSV}</b>
                                </li>
                                <li>
                                    Họ tên: <b>{data.data.ThongTinCaNhan.hoTenSV}</b>
                                </li>
                                <li>
                                    Giới tính: <b>{data.data.ThongTinCaNhan.gioiTinh}</b>
                                </li>
                                <li>
                                    Ngày sinh: <b>{data.data.ThongTinCaNhan.ngaySinh}</b>
                                </li>
                                <li>
                                    Nơi sinh: <b>{data.data.ThongTinCaNhan.noiSinh}</b>
                                </li>
                            </ul>
                        </div>
                        <div className="text-info2">
                            <ul>
                                <li>
                                    Lớp học: <b>{data.data.ThongTinHocVan.lopDanhNghia}</b>
                                </li>
                                <li>
                                    Khóa học: <b>{data.data.ThongTinHocVan.nienKhoa}</b>
                                </li>
                                <li>
                                    Bậc đào tạo: <b>{data.data.ThongTinHocVan.bacDaoTao}</b>
                                </li>
                                <li>
                                    Loại hình đào tạo: <b>{data.data.ThongTinHocVan.loaiHinhDaoTao}</b>
                                </li>
                                <li>
                                    Ngành: <b>{data.data.ThongTinHocVan.chuyenNganh}</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="learning-calendar">
                        <Row className="row">
                            <Col className="col" span={12}>
                                <Link className="dir" to="/home/lichhoc">
                                    <Card
                                        className={`card1 ${statusScroll === false ? '' : 'animate__jackInTheBox'} `}
                                        title="Lịch học theo tuần"
                                        style={{ color: '#1da1f2', backgroundColor: '#e0fbff' }}
                                    >
                                        <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <h1>2</h1>
                                            <div className="card-icon">
                                                <i className="fa-solid fa-calendar-days"></i>
                                            </div>
                                        </div>
                                        <p>Xem chi tiết</p>
                                    </Card>
                                </Link>
                            </Col>
                            <Col className="col" span={12}>
                                <Card
                                    className={`card2 ${statusScroll === false ? '' : 'animate__jackInTheBox'} `}
                                    title="Lịch thi theo tuần"
                                    style={{ color: '#ff9205', backgroundColor: '#fff2d4', float: 'right' }}
                                >
                                    <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h1>0</h1>
                                        <div className="card-icon">
                                            <i className="fa-solid fa-calendar-days"></i>
                                        </div>
                                    </div>
                                    <p>Xem chi tiết</p>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="row2">
                            <Col className="col2">
                                <Link style={{ textDecoration: 'none' }} to="/home/thongbao">
                                    <Card
                                        className={`card ${statusScroll === false ? '' : 'animate__jackInTheBox'} `}
                                        title="Nhắc nhở mới chưa xem"
                                        style={{ color: '#737373' }}
                                    >
                                        <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <h1>{tb.length}</h1>
                                            <div className="card-icon">
                                                <i className="fa-regular fa-bell"></i>
                                            </div>
                                        </div>
                                        <p>Xem chi tiết</p>
                                    </Card>
                                </Link>
                                <Card
                                    className={`card ${statusScroll === false ? '' : 'animate__jackInTheBox'} mt-3 `}
                                    title="Số môn học trong học kì"
                                    style={{ color: '#737373' }}
                                >
                                    <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h1>{mangMoi.length}</h1>
                                        <div className="card-icon">
                                            <i className="fa-solid fa-book"></i>
                                        </div>
                                    </div>
                                    <p>Xem chi tiết</p>
                                </Card>
                            </Col>

                            <Col className="col2">
                                <Card className="card2" title="Lớp học phần" style={{ color: '#1da1f2' }}>
                                    <Table dataSource={mangMoi} columns={columns} pagination={{ pageSize: 3 }} />
                                </Card>
                            </Col>
                        </Row>

                        <Row className="row3">
                            <Col className="col3">
                                <Card title="Tổng số tín chỉ đạt được" className="card">
                                    <div className="chart">
                                        <ProgressChart progress={139} total={146} />
                                    </div>
                                </Card>
                            </Col>
                            <Col style={{ width: 64 + '%' }} className="col3">
                                <Card className="card2 result-chart">
                                    <div className="chart">
                                        <ResultChart dataPoints={dataPoints} />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <HomeGiangVien />
            )}
        </>
    );
};

export default Content;
