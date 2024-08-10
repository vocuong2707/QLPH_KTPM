import { Button, Table } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';
import './DangKiHocPhan.scss';
import { useState } from 'react';

interface Course {
    key: string;
    maLopHocPhan: string;
    tenMonHoc: string;
    soLuong: string;
    trangThai: string;
    tenGiaoVien: string;
}

const DangKiHocPhan = () => {
    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    const dataToShow = data.DanhSachHocPhan.filter((item: any) => item.trangThai === 'Đã mở đăng kí').map(
        (item: any, index: number) => ({
            key: item._id,
            stt: index + 1,
            maLopHocPhan: item.maLopHocPhan,
            tenMonHoc: item.tenMonHoc,
            soTinChi: item.soTinChi,
            soTietLT: item.soTietLT,
            soTietTH: item.soTietTH,
        }),
    );

    // UseState
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRowKeys2, setSelectedRowKeys2] = useState([]);
    const [dataCourse, setDataCourse] = useState<Course[]>([]);

    // Function
    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
        const selectedRow = dataToShow.find((item: any) => item.key === selectedRowKeys[0]);

        const courseSeleted = data.DanhSachHocPhan.find((item: any) => item._id === selectedRow.key);

        let sinhVien = 0;

        if (courseSeleted.danhSachSinhVien) {
            sinhVien = courseSeleted.danhSachSinhVien.length;
        }
        setDataCourse([
            {
                key: courseSeleted._id,
                maLopHocPhan: courseSeleted.maLopHocPhan,
                tenMonHoc: courseSeleted.tenMonHoc,
                soLuong: `${sinhVien}/${courseSeleted.soLuong}`,
                trangThai: courseSeleted.trangThai,
                tenGiaoVien: courseSeleted.thongTinLich[0].tenGV,
            },
        ]);
    };

    const rowSelection = (selectedRowKeys2: any) => {
        setSelectedRowKeys2(selectedRowKeys2);
    };

    const handleSubmit = () => {};

    const columns = [
        {
            title: 'Chọn',
            dataIndex: 'select1',
            key: 'select1',
            width: 60,
            align: 'center',
            render: (text: any, record: any) => (
                <input
                    type="radio"
                    name="select1"
                    checked={selectedRowKeys.includes(record.key)}
                    onChange={() => onSelectChange([record.key])}
                />
            ),
            //responsive: ['md'] Hiển thị từ màn hình medium trở lên
        },
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 60,
            align: 'center',
            responsive: ['sm'], // Hiển thị từ màn hình small trở lên
        },
        {
            title: 'Mã Lớp HP',
            dataIndex: 'maLopHocPhan',
            key: 'maLopHocPhan',
            width: 50,
            align: 'center',
        },
        {
            title: 'Tên Môn Học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
            width: 250,
        },
        {
            title: 'Môn học tiên quyết',
            key: 'info',
            width: 80,
            align: 'center',
            render: (text: any, record: any) => <CloseCircleOutlined style={{ fontSize: '20px', color: 'red' }} />,
        },
        {
            title: 'Số Tín Chỉ',
            dataIndex: 'soTinChi',
            key: 'soTinChi',
            width: 100,
            align: 'center',
        },
        {
            title: 'Số Tiết LT',
            dataIndex: 'soTietLT',
            key: 'soTietLT',
            width: 100,
            align: 'center',
        },
        {
            title: 'Số Tiết TH',
            dataIndex: 'soTietTH',
            key: 'soTietTH',
            width: 100,
            align: 'center',
        },
    ];

    const columns2 = [
        {
            title: 'Chọn',
            dataIndex: 'select2',
            key: 'select2',
            width: 60,
            align: 'center',
            render: (text: any, record: any) => (
                <input
                    type="radio"
                    name="select2"
                    checked={selectedRowKeys.includes(record.key)}
                    onChange={() => rowSelection([record.key])}
                />
            ),
            //responsive: ['md'] Hiển thị từ màn hình medium trở lên
        },
        {
            title: 'Mã Lớp HP',
            dataIndex: 'maLopHocPhan',
            key: 'maLopHocPhan',
            width: 100,
            align: 'center',
        },
        {
            title: 'Tên Môn Học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
            width: 250,
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            width: 60,
            align: 'center',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            width: 100,
            align: 'center',
        },
        {
            title: 'Tên Giáo Viên',
            dataIndex: 'tenGiaoVien',
            key: 'tenGiaoVien',
            width: 140,
            align: 'center',
        },
    ];

    return (
        <>
            <NavBar />
            <div className="dang-ki-hoc-phan-container">
                <div className="content">
                    <div className="title">
                        <h1>ĐĂNG KÍ HỌC PHẦN</h1>
                    </div>
                    <Table columns={columns} dataSource={dataToShow} pagination={false} scroll={{ x: true }} />
                    <hr />
                    <div className="title">
                        <h1>THÔNG TIN LỚP HỌC PHẦN</h1>
                    </div>
                    <Table columns={columns2} dataSource={dataCourse} pagination={false} scroll={{ x: true }} />

                    <div className="submitBtn">
                        <Button onClick={handleSubmit}>Đăng ký</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DangKiHocPhan;
