import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from 'antd';

//import './content.scss';
import { SinhVien } from '../../../DataSample';
import avt from '../../assets/images/avt4.jpg';
import { Link } from 'react-router-dom';
import './HomeGiangVien.scss'

const HomeGiangVien: React.FC = () => {

    const thongTinHocPhan = SinhVien.ThongTinHocPhan;
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
    return (
        <div className="content-coponent">
            <div className="my-info">
                <div className="title-info">
                    <span>Thông tin giảng viên</span>
                </div>
                <hr />
                <div className="avt">
                    {data.data.ThongTinCaNhan.anhDaiDien != null
                        ? (<img src={data.data.ThongTinCaNhan.anhDaiDien} alt="" />)
                        : (<img src={avt} alt="" />)}

                </div>
                <div className="text-info">
                    <ul>
                        <li>
                            MSGV: <b>{data.data.ThongTinCaNhan.maGV}</b>
                        </li>
                        <li>
                            Họ tên: <b>{data.data.ThongTinCaNhan.hoTenGV}</b>
                        </li>
                        <li>
                            Giới tính: <b>{data.data.ThongTinCaNhan.gioiTinh}</b>
                        </li>
                        <li>
                            SĐT: <b>{data.data.ThongTinCaNhan.SDT}</b>
                        </li>
                        <li>
                            Học hàm:
                        </li>
                    </ul>
                </div>
                <div className="text-info2">
                    <ul>
                        <li>
                            Chức vụ: <b>{data.data.ThongTinCaNhan.chucVu}</b>
                        </li>
                        <li>
                            Email: <b>{data.data.ThongTinCaNhan.email}</b>
                        </li>
                        <li>Khoa: <b>CNTT</b></li>
                        <li>Học vị:</li>

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
                                    <h1>{thongTinHocPhan.appointments.length}</h1>
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
                        <Link className="item_thongbao" to="/home/thongbao">
                            <Card
                                className={`card ${statusScroll === false ? '' : 'animate__jackInTheBox'} `}
                                title="Nhắc nhở mới chưa xem"
                                style={{ color: '#737373' }}
                            >
                                <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h1>0</h1>
                                    <div className="card-icon">
                                        <i className="fa-regular fa-bell"></i>
                                    </div>
                                </div>
                                <p>Xem chi tiết</p>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HomeGiangVien;
