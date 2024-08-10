import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import './QuanLyYeuCau.scss';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');

const { Content } = Layout;

type ParamType = {
    tenMonHoc: string;
};
const QuanLyYeuCau: React.FC = () => {
    const { loai } = useParams<ParamType>();
    let xacnhan = false;
    let name = '';
    if (loai === 'daduyet') {
        xacnhan = true;
        name = 'Đã Duyệt';
    }
    if (loai === 'choduyet') {
        xacnhan = false;
        name = 'Chờ Duyệt';
    }

    const [rerender, setRerender] = useState(false);

    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    socket.on('confirmRequest', (DS: any) => {
        data.DanhSachGiaoVien = DS;
        localStorage.setItem('myDataKey', JSON.stringify(data));
        setRerender(false);
    });

    const yeuCauMoi = data.DanhSachGiaoVien.flatMap(
        (giaoVien) =>
            giaoVien.ThongTinGiangDay?.yeuCau?.map((yeucau) => {
                const localDate = new Date(yeucau.thoigian).toLocaleString('en-US', { timeZone: 'UTC' });
                return {
                    ...yeucau,
                    tenGV: giaoVien.ThongTinCaNhan.hoTenGV,
                    thoigian: localDate,
                };
            }) || [],
    );
    const yeuCauDaXacNhan = yeuCauMoi.filter((item) => item.trangthaixacnhan == xacnhan);

    const [textAreaContents, setTextAreaContents] = useState({});
    const handleTextAreaChange = (index, event) => {
        setTextAreaContents({
            ...textAreaContents,
            [index]: event.target.value,
        });
    };

    const handleConfirm = async (item: any, textAreaValue: String) => {
        const data = {
            ...item,
            tinnhanphanhoi: textAreaValue,
        };

        try {
            const response = await fetch('http://localhost:3001/admin/confirm-request', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setTextAreaContents({});
                setRerender(true);
            } else {
                console.log('fail');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => { }, [rerender]);

    return (
        <>
            <AdminNavbar />
            <Layout className="yeucau__body__content">
                <AdminSider />
                <Layout className="yeucau__content">
                    <div style={{ padding: '5px 80px', fontSize: '25px', fontWeight: '700' }}>Yêu cầu {name}</div>
                    <Content>
                        {yeuCauDaXacNhan.map((item: any, i) => (
                            <div key={i} className="list__yeucau">
                                <div className="yeucau__card ">
                                    <div style={{ padding: '2px 10px' }}>STT: {i + 1}</div>
                                    <div className="yeucau__header">
                                        <div className="yeucau__title"> Title: {item.lydo}</div>
                                        <div className="yeucau__user">
                                            Gửi từ: <strong>{item.tenGV}</strong>
                                        </div>
                                    </div>
                                    <div className="yeucau__body">
                                        <div className="yeucau__item">
                                            <strong>Môn:</strong> {item.monhoc}
                                        </div>
                                        <div className="yeucau__item">
                                            <strong>Thời Gian:</strong> {item.thoigian}
                                        </div>
                                        <div className="yeucau__item">
                                            <strong>Tiết: </strong>
                                            {item.tietday}
                                        </div>
                                        <div className="yeucau__item">
                                            <strong>Lý do: </strong>
                                            {item.lydo}
                                        </div>
                                    </div>
                                    <div className="yeucau_form">
                                        {xacnhan == false ? (
                                            <>
                                                <div className="yeucau__phanhoi">
                                                    <textarea
                                                        placeholder="Tin nhắn phẩn hồi"
                                                        value={textAreaContents[i] || ''}
                                                        onChange={(event) => handleTextAreaChange(i, event)}
                                                    />
                                                </div>
                                                <div className="yeucau__footer">
                                                    <div>
                                                        <button
                                                            onClick={() => handleConfirm(item, textAreaContents[i])}
                                                            className="yeucau__xacnhan"
                                                        >
                                                            Gửi phản hồi
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className='yeucau__body'>
                                                <div className="yeucau__item">
                                                    <strong>Phản hồi: </strong>{item.tinnhanphanhoi}
                                                </div>
                                            </div>)}

                                    </div>
                                </div>
                            </div>
                        ))}
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    );
};

export default QuanLyYeuCau;
