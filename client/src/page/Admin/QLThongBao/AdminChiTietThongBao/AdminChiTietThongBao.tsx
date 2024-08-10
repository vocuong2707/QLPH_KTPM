import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import AdminSider from '../../AdminSider/AdminSider';
import { Layout } from 'antd';
import './AdminChiTietThongBao.scss'

type ParamType = {
    tenThongBao: string;
};
const { Content } = Layout;
const AdminChiTietThongBao: React.FC = () => {
    const { slug } = useParams<ParamType>();

    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);

    const [data, setData] = useState([])
    useEffect(() => {
        const updatedData = [];
        thongtin.DanhSachThongBao.forEach(mang => {
            const localDate = new Date(mang.ngayTao).toLocaleString('en-US', { timeZone: 'UTC' });
            updatedData.push({
                ...mang,
                ngayTao: localDate,
            });
        });
        const thongBao = updatedData.find((item) => item.slug === slug);
        setData(thongBao);
    }, [slug]);

    console.log("a", data);
    return (
        <>
            <AdminNavbar />
            <Layout className="Admin_content">
                <AdminSider />
                <Layout>
                    <Content className="right">
                        <div className='Admin_Thongbao_content'>
                            <div className="Admin_Thongbao_body">
                                <div className='Admin_Thongbao_title'>
                                    <div className='Admin_Thongbao_name'>{data.tenThongBao}</div>
                                    <div className='Admin_Thongbao_time'>Ngày tạo: {data.ngayTao}</div>
                                </div>
                                <div className='Admin_Thongbao_des'>
                                    <div className='Admin_Thongbao_text'>
                                        {data.chiTiet}
                                    </div>
                                    {data.dinhKem === "không có file đính kèm" ? (<></>) : (<div className='Admin_Thongbao_img'>
                                        <img src={data.dinhKem} alt="" className='Admin_Thongbao_img_if' />
                                    </div>)}


                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </>
    )
};
export default AdminChiTietThongBao;