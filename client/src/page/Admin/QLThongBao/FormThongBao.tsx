import React, { useState, useEffect } from 'react';
import './QLThongBao.scss';
import { ToastContainer, toast } from 'react-toastify';

const FormThongBao: React.FC = () => {
    const [tenThongBao, setTenThongBao] = useState('');
    const [chiTiet, setChiTiet] = useState('');
    const [danhCho, setDanhCho] = useState('sinhvien');
    const [ngayTao, setNgayTao] = useState(new Date().toISOString().slice(0, 10));
    const [dinhKem, setDinhKem] = useState<string | null>('');
    const [error, setError] = useState('');

    const handleTenThongBaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTenThongBao(event.target.value);
    };

    const handleChiTietChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChiTiet(event.target.value);
    };

    const handleDinhKemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setDinhKem(files[0].name);
        } else {
            setDinhKem('');
        }
    };

    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!tenThongBao || !chiTiet) {
            setError('Vui lòng điền tên thông báo và chi tiết.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/admin/create-notify', {
                method: 'POST',
                body: JSON.stringify({ tenThongBao, chiTiet, ngayTao, danhCho, dinhKem }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Nếu request thành công, hiển thị thông báo thành công
                toast.success('Thêm thông báo thành công!');
                setTenThongBao('');
                setChiTiet('');
                setDanhCho('sinhvien');
                setNgayTao(new Date().toISOString().slice(0, 10));
                setDinhKem(null);
                setError('');
                const data = response.json();
                data.then((result) => {
                    thongtin.DanhSachThongBao.push(result.notify.thongBaoNew);
                    localStorage.setItem('myDataKey', JSON.stringify(thongtin));
                });
            } else {
                // Nếu request không thành công, hiển thị thông báo thất bại
                toast.error('Thêm thông báo thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi khi có lỗi trong quá trình gửi request
            toast.error('Có lỗi xảy ra. Vui lòng thử lại sau!');
        }
    };

    useEffect(() => {}, [thongtin]);

    return (
        <>
            <ToastContainer />
            <div style={{ fontSize: '20px', fontWeight: 'bold', paddingLeft: '55px', paddingBottom: '12px' }}>
                Thêm thông báo
            </div>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                    <label htmlFor="tenThongBao">Tên thông báo:</label>
                    <input
                        type="text"
                        id="tenThongBao"
                        className="form-control"
                        value={tenThongBao}
                        onChange={handleTenThongBaoChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="chiTiet">Chi tiết:</label>
                    <textarea
                        id="chiTiet"
                        className="form-control"
                        style={{ height: '250px', maxHeight: '450px', overflowY: 'auto' }}
                        value={chiTiet}
                        onChange={handleChiTietChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ngayTao">Ngày tạo:</label>
                    <input
                        type="date"
                        id="ngayTao"
                        className="form-control"
                        value={ngayTao}
                        onChange={(e) => setNgayTao(e.target.value)}
                    />
                </div>
                <div className="form-group" style={{ marginTop: '6px' }}>
                    <label htmlFor="danhCho">Loại tài khoản:</label>
                    <select
                        className="form-control"
                        name="danhCho"
                        value={danhCho}
                        onChange={(e) => setDanhCho(e.target.value)}
                    >
                        <option value="sinhvien">Sinh viên</option>
                        <option value="giaovien">Giảng viên</option>
                        <option value="tatca">Tất cả</option>
                    </select>
                </div>
                <div className="form-group" style={{ marginTop: '20px' }}>
                    <label htmlFor="dinhKem">Ảnh đính kèm : </label>
                    <input type="file" id="dinhKem" onChange={handleDinhKemChange} multiple />
                </div>
                <div style={{ height: '40px', maxHeight: '90px', overflowY: 'auto' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button type="submit" className="btn btn-primary" style={{ width: '90%' }}>
                        Thêm thông báo
                    </button>
                </div>
            </form>
        </>
    );
};
export default FormThongBao;
