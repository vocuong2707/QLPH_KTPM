import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar';
import { Breadcrumb, Card, List } from 'antd';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import './thongBao.scss';

export const Thongbao = () => {


    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);

    const ThongBaoSV = thongtin.DanhSachThongBao.DSTB;
    const ThongBaoALL = thongtin.DanhSachThongBao.DSTBALL;

    const mangMoi = ThongBaoSV.concat(ThongBaoALL);

    console.log("tb", mangMoi);

    const [data, setData] = useState([])
    useEffect(() => {
        // Tạo mảng mới để lưu trữ tất cả lịch học
        const updatedData = [];

        mangMoi.forEach(mang => {
            // Chuyển đổi endDate và startDate sang địa phương không thay đổi giá trị thời gian
            const localDate = new Date(mang.ngayTao).toLocaleString('en-US', { timeZone: 'UTC' });


            updatedData.push({
                ...mang,
                ngayTao: localDate,
            });
        });


        setData(updatedData);
    }, []);
    console.log("tb", data);

    return (
        <>
            <NavBar />
            <div className="notify-component">
                <div className="breadcrumb-notify">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link
                                style={{
                                    fontSize: 16 + 'px',
                                    textDecoration: 'none',
                                    color: 'rgba(0, 0, 0, 0.88)',
                                    fontWeight: 'normal',
                                }}
                                to="/home"
                            >
                                Trang Chủ
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link
                                style={{
                                    fontSize: 16 + 'px',
                                    textDecoration: 'none',
                                    color: 'rgba(0, 0, 0, 0.88)',
                                    fontWeight: 'normal',
                                }}
                                to="/home/thongbao"
                            >
                                Thông Báo
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="notify-list">
                    <Card className="card" title="THÔNG BÁO" style={{ color: '#737373' }}>
                        <List
                            grid={{ gutter: 16, column: 1 }} // Thiết lập cấu trúc danh sách (3 cột)
                            dataSource={data} // Danh sách dữ liệu
                            renderItem={(item) => (
                                <List.Item>
                                    <div className='item'>
                                        <Link to={`/home/thongbao/${item.slug}`}>
                                            <Card >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <h5>{item.tenThongBao}</h5>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontStyle: 'italic' }}> Ngày tạo: {item.ngayTao}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>

                </div>
            </div >
            <Footer />
        </>
    );
};
