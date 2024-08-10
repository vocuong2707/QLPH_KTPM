import React, { useState, useEffect } from 'react';
import NavBar from '../../../../components/NavBar/NavBar';
import { useParams } from 'react-router-dom';
import './ChiTietThongBao.scss';

type ParamType = {
    tenThongBao: string;
};

const ChiTietThongBao: React.FC = () => {
    const { tenThongBao } = useParams<ParamType>();

    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);

    const ThongBaoSV = thongtin.DanhSachThongBao.DSTB;
    const ThongBaoALL = thongtin.DanhSachThongBao.DSTBALL;

    const mangMoi = ThongBaoSV.concat(ThongBaoALL);

    const [data, setData] = useState([]);
    useEffect(() => {
        // Tạo mảng mới để lưu trữ tất cả lịch học
        const updatedData = [];

        mangMoi.forEach((mang) => {
            // Chuyển đổi endDate và startDate sang địa phương không thay đổi giá trị thời gian
            const localDate = new Date(mang.ngayTao).toLocaleString('en-US', { timeZone: 'UTC' });

            updatedData.push({
                ...mang,
                ngayTao: localDate,
            });
        });

        setData(updatedData);
    }, []);

    const thongBao = data.find((item) => item.slug === tenThongBao);

    if (!thongBao) {
        return <div>Không tìm thấy thông báo</div>;
    }

    return (
        <>
            <NavBar />
            <div className="Thongbao_content">
                <div className="Thongbao_body">
                    <div className="Thongbao_title">
                        <div className="Thongbao_name">{thongBao.tenThongBao}</div>
                        <div className="Thongbao_time">Ngày tạo: {thongBao.ngayTao}</div>
                    </div>
                    <div className="Thongbao_des">
                        <div className="Thongbao_text">{thongBao.chiTiet}</div>
                        {thongBao.dinhKem === 'không có file đính kèm' ? (
                            <></>
                        ) : (
                            <div className="Thongbao_img">
                                <img src={thongBao.dinhKem} alt="" className="Thongbao_img_if" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChiTietThongBao;
