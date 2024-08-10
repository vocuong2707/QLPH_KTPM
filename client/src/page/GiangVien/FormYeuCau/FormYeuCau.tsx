import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import './FormYeuCau.scss';
import { ToastContainer, toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');

const FormYeuCau: React.FC = () => {
    const [isRerender, setIsRerender] = useState(false);
    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    socket.on('requestSchedule', (GV: any) => {
        data.data = GV;
        localStorage.setItem('myDataKey', JSON.stringify(data));
        setIsRerender(!isRerender);
    });

    const [formData, setFormData] = useState({
        hoTenGV: data.data.ThongTinCaNhan.hoTenGV,
        ngay: '',
        monhoc: data.lich[0].tenMonHoc,
        tietday: '',
        lydo: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (e.target.type === 'select-one') {
            const selectedIndex = e.target.selectedIndex;
            const selectedValue = e.target.options[selectedIndex].value;
            setFormData({
                ...formData,
                [name]: selectedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('http://localhost:3001/teacher/request-schedule', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.success('Gửi yêu cầu thành công, vui lòng đợi xác nhận');
            } else {
                toast.error('Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const yeuCauArray =
        data.data.ThongTinGiangDay.yeuCau.map((yeucau) => {
            const localDate = new Date(yeucau.thoigian).toLocaleString('en-US', { timeZone: 'UTC' });
            return {
                ...yeucau,
                thoigian: localDate,
            };
        }) || [];

    const daduyets = yeuCauArray.filter((item) => item.trangthaixacnhan == true);
    const choduyets = yeuCauArray.filter((item) => item.trangthaixacnhan == false);

    useEffect(() => {}, [isRerender]);

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="formyeucau__container">
                <div className="your-form-container">
                    <h2 style={{ textAlign: 'center' }}>Yêu Cầu Đến Khoa</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Tên:
                            <input type="text" name="hoTenGV" value={formData.hoTenGV} readOnly />
                        </label>

                        <label>
                            Ngày:
                            <input type="date" name="ngay" value={formData.ngay} onChange={handleChange} />
                        </label>

                        <label>
                            Tiết dạy:
                            <input type="text" name="tietday" value={formData.tietday} onChange={handleChange} />
                        </label>
                        <label>
                            Môn:
                            <select name="monhoc" value={formData.monhoc} onChange={handleChange}>
                                {data.lich.map((monHoc: any) => (
                                    <option key={monHoc.maLopHocPhan} value={monHoc.tenMonHoc}>
                                        {monHoc.tenMonHoc}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Lý do:
                            <textarea name="lydo" value={formData.lydo} onChange={handleChange} />
                        </label>

                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="formyeucau__list">
                    <div className="formyeucau__cho">
                        <h5>Yêu cầu chờ</h5>
                        {choduyets.map((item, i) => (
                            <div key={i} className="formyeucau__card">
                                <div className="formyeucau__header">
                                    <div>
                                        <strong>Môn:</strong> {item.monhoc}
                                    </div>
                                    <div>
                                        <strong>Ngày dạy:</strong> {item.thoigian}
                                    </div>
                                    <div>
                                        <strong>Tiết dạy:</strong> {item.tietday}
                                    </div>
                                </div>
                                <div>
                                    <strong>Lý do:</strong>
                                    {item.lydo}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="formyeucau__daduyet">
                        <h5>Yêu cầu đã duyệt</h5>
                        {daduyets.map((item, i) => (
                            <div key={i} className="formyeucau__card_2">
                                <div className="formyeucau__header_2">
                                    <div>
                                        <strong>Môn:</strong> {item.monhoc}
                                    </div>
                                    <div>
                                        <strong>Ngày dạy:</strong> {item.thoigian}
                                    </div>
                                    <div>
                                        <strong>Tiết dạy:</strong> {item.tietday}
                                    </div>
                                </div>
                                <div>
                                    <strong>Lý do:</strong>
                                    {item.lydo}
                                </div>
                                <div>
                                    <strong>Phản hồi:</strong>
                                    {item.tinnhanphanhoi}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormYeuCau;
