import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, Input, InputNumber, DatePicker, Empty } from 'antd';
import { CheckOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import './ChiTietMonHoc.scss';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { set } from 'immer/dist/internal.js';

type ParamType = {
    maMonHoc: string;
};

// import Paper from '@mui/material/Paper';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import { ViewState } from '@devexpress/dx-react-scheduler';

// import {
//     Scheduler,
//     WeekView,
//     MonthView,
//     Appointments,
//     AppointmentTooltip,
//     Toolbar,
//     DateNavigator,
//     TodayButton,
// } from '@devexpress/dx-react-scheduler-material-ui';

// import { io, Socket } from 'socket.io-client';

// const socket: Socket = io('http://localhost:3001');

// const { Content } = Layout;

// interface AppointmentData {
//     startDate: Date;
//     endDate: Date;
//     phongHoc: string;
//     ghiChu: string;
//     tenGV: string;
//     tietHoc: string;
// }

// const ExternalViewSwitcher = ({
//     currentViewName,
//     onChange,
// }: {
//     currentViewName: string;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) => (
//     <RadioGroup
//         aria-label="Views"
//         style={{ flexDirection: 'row' }}
//         name="views"
//         value={currentViewName}
//         onChange={onChange}
//     >
//         <FormControlLabel value="Week" control={<Radio />} label="Lịch theo Tuần" />
//         <FormControlLabel value="Month" control={<Radio />} label="Lịch theo Tháng" />
//     </RadioGroup>
// );
interface Course {
    key: string;
    maLopHocPhan: string;
    tenMonHoc: string;
    soLuong: string;
    soTinChi: string;
    trangThai: string;
    tenNhomThucHanh?: string;
    tenGiaoVien: string;
    soTietLT: number;
    soTietTH: number;
    danhSachSinhVien?: Array<string>;
}
const ChiTietMonHoc: React.FC = () => {
    //     const { tenMonHoc } = useParams<ParamType>();

    //     const [data, setData] = useState([]);
    //     const [isModelVisible, setModelVisible] = useState(false);

    //     const storedData: any = localStorage.getItem('myDataKey');
    //     const danhSach = JSON.parse(storedData);

    //     socket.on('cancelSchedule', (data: { monhoc: any }) => {
    //         const foundIndex = danhSach.DanhSachHocPhan.findIndex((item: any) => {
    //             return item.maLopHocPhan === data.monhoc.maLopHocPhan;
    //         });

    //         if (foundIndex !== -1) {
    //             danhSach.DanhSachHocPhan[foundIndex] = data.monhoc; // Cập nhật giá trị tại chỉ mục đã tìm thấy
    //             localStorage.setItem('myDataKey', JSON.stringify(danhSach));
    //         }
    //     });

    //     socket.on('updateSchedule', (data: { monhoc: any }) => {
    //         const foundIndex = danhSach.DanhSachHocPhan.findIndex((item: any) => {
    //             return item.maLopHocPhan === data.monhoc.maLopHocPhan;
    //         });

    //         if (foundIndex !== -1) {
    //             danhSach.DanhSachHocPhan[foundIndex] = data.monhoc; // Cập nhật giá trị tại chỉ mục đã tìm thấy
    //             localStorage.setItem('myDataKey', JSON.stringify(danhSach));
    //         }
    //     });

    //     useEffect(() => {
    //         const tenMonHocCanTim = tenMonHoc; // Tên môn học bạn muốn tìm
    //         const monHocDaTim = danhSach.DanhSachHocPhan.find((item: any) => item.maLopHocPhan === tenMonHocCanTim);

    //         const updatedData: any = [];

    //         monHocDaTim.thongTinLich.forEach((lich: any) => {
    //             // Chuyển đổi endDate và startDate sang địa phương không thay đổi giá trị thời gian
    //             const localEndDate = new Date(lich.endDate).toLocaleString('en-US', { timeZone: 'UTC' });
    //             const localStartDate = new Date(lich.startDate).toLocaleString('en-US', { timeZone: 'UTC' });

    //             updatedData.push({
    //                 ...lich,
    //                 endDate: localEndDate,
    //                 startDate: localStartDate,
    //             });
    //         });

    //         if (updatedData) {
    //             // Nếu tìm thấy môn học, cập nhật data bằng môn học đó
    //             setData(updatedData);
    //         }
    //     }, [tenMonHoc, isModelVisible]);

    //     const [currentViewName, setCurrentViewName] = useState('Week');

    //     const currentViewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         setCurrentViewName(e.target.value);
    //     };

    //     const Appointment: React.FC<{
    //         children: React.ReactNode;
    //         style: React.CSSProperties;
    //         data: AppointmentData;
    //     }> = ({ children, style, data, ...restProps }) => {
    //         const dynamicBackgroundColor = data.ghiChu === 'Tạm ngưng' ? 'rgb(248, 200, 195)' : '';
    //         return (
    //             <Appointments.Appointment
    //                 {...restProps}
    //                 style={{
    //                     ...style,
    //                     backgroundColor: dynamicBackgroundColor,
    //                     borderRadius: '8px',
    //                 }}
    //                 onClick={() => {
    //                     handleAppointmentClick(data);
    //                     toggleModelVisibility();
    //                 }}
    //             >
    //                 {children}
    //                 <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
    //                     GV: <span style={{ color: 'red' }}>{data.tenGV}</span>
    //                 </div>
    //                 <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
    //                     Tiết: <span style={{ color: 'red' }}>{data.tietHoc}</span>
    //                 </div>
    //                 <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
    //                     Phòng: <span style={{ color: 'red' }}>{data.phongHoc}</span>
    //                 </div>
    //                 <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
    //                     Ghi chú: <span style={{ color: 'red' }}>{data.ghiChu}</span>
    //                 </div>
    //             </Appointments.Appointment>
    //         );
    //     };

    //     const customAppointment: React.FC<{
    //         children: React.ReactNode;
    //         style: React.CSSProperties;
    //     }> = ({ children, style, ...restProps }) => (
    //         <Appointments.Appointment
    //             {...restProps}
    //             style={{
    //                 ...style,
    //                 /* backgroundColor: '#FFC107', */
    //                 borderRadius: '8px',
    //             }}
    //         >
    //             {children}
    //         </Appointments.Appointment>
    //     );
    //     const [selectedAppointment, setSelectedAppointment] = useState({});

    //     const handleAppointmentClick = (data: Object) => {
    //         setSelectedAppointment(data);
    //     };

    //     const toggleModelVisibility = () => {
    //         setModelVisible(!isModelVisible);
    //     };
    //     const toggleClose = () => {
    //         setModelVisible(false);
    //         setSelectedAppointment({});
    //     };

    //     const tenMon = danhSach.DanhSachHocPhan.find((item: any) => item.maLopHocPhan === tenMonHoc);
    //     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //         const { name, value } = e.target;
    //         setSelectedAppointment((prevAppointment) => ({
    //             ...prevAppointment,
    //             [name]: value,
    //         }));
    //     };

    //     const handleUpdateSchedule = async (event: React.FormEvent) => {
    //         event.preventDefault();
    //         if (tenMon) {
    //             selectedAppointment.maMonHoc = tenMon.maLopHocPhan;
    //         }
    //         try {
    //             const response = await fetch('http://localhost:3001/admin/update-schedule', {
    //                 method: 'POST',
    //                 body: JSON.stringify(selectedAppointment),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             if (response.ok) {
    //                 setModelVisible(false);
    //                 setSelectedAppointment({});
    //             } else {
    //                 console.log('fail');
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     const handleCancelSchedule = async (event: React.FormEvent) => {
    //         event.preventDefault();
    //         if (tenMon) {
    //             selectedAppointment.maMonHoc = tenMon.maLopHocPhan;
    //         }
    //         try {
    //             const response = await fetch('http://localhost:3001/admin/cancel-schedule', {
    //                 method: 'POST',
    //                 body: JSON.stringify(selectedAppointment),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             if (response.ok) {
    //                 setModelVisible(false);
    //                 setSelectedAppointment({});
    //             } else {
    //                 console.log('fail');
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    const { maMonHoc } = useParams<ParamType>();
    const [rerender, setRerender] = useState(false);
    const [dataCourse, setDataCourse] = useState<Course[]>([]);
    const [dataCourse2, setDataCourse2] = useState<Course[]>([]);
    const [dataCourse3, setDataCourse3] = useState<Course[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [form] = Form.useForm();

    const dataToShow = data.DanhSachHocPhan.filter((item: any) => item.trangThai === 'Chấp nhận mở lớp').map(
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

    useEffect(() => {
        let sinhVien = 0;

        const courses = data.DanhSachHocPhan.filter(
            (item: any) => item.maLopHocPhan === maMonHoc && item.trangThai === 'Đã mở đăng kí',
        ).map((item: any) => {
            if (item.danhSachSinhVien) {
                sinhVien = item.danhSachSinhVien.length;
            }

            return {
                key: item._id,
                maLopHocPhan: item.maLopHocPhan,
                tenMonHoc: item.tenMonHoc,
                soLuong: `${sinhVien}/${item.soLuong}`,
                trangThai: item.trangThai,
                soTinChi: item.soTinChi,
                tenNhomThucHanh: item.tenNhomThucHanh,
                tenGiaoVien: item.thongTinLich[0].tenGV,
                soTietLT: item.soTietLT,
                soTietTH: item.soTietTH,
                danhSachSinhVien: item.danhSachSinhVien,
            };
        });

        const courses2 = data.DanhSachHocPhan.filter(
            (item: any) => item.maLopHocPhan === maMonHoc && item.trangThai === 'Chấp nhận mở lớp',
        ).map((item: any) => {
            if (item.danhSachSinhVien) {
                sinhVien = item.danhSachSinhVien.length;
            }

            return {
                key: item._id,
                maLopHocPhan: item.maLopHocPhan,
                tenMonHoc: item.tenMonHoc,
                soLuong: `${sinhVien}/${item.soLuong}`,
                trangThai: item.trangThai,
                soTinChi: item.soTinChi,
                tenNhomThucHanh: item.tenNhomThucHanh,
                tenGiaoVien: item.thongTinLich[0].tenGV,
                soTietLT: item.soTietLT,
                soTietTH: item.soTietTH,
                danhSachSinhVien: item.danhSachSinhVien,
            };
        });

        setDataCourse(courses);
        setDataCourse2(courses2);
    }, [maMonHoc, rerender]);

    const handleConfirm = async (key: string) => {
        try {
            const response = await fetch('http://localhost:3001/course/open-course', {
                method: 'POST',
                body: JSON.stringify({ key }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const rs = response.json();

                rs.then((result) => {
                    if (result.course.status === 'fail') {
                        toast.error(result.course.message);
                    } else {
                        toast.success(result.course.message);
                        data.DanhSachHocPhan = result.course.DSHP;
                        localStorage.setItem('myDataKey', JSON.stringify(data));
                        setRerender(!rerender);
                    }
                });
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const handleCancel = async (key: string) => {
        const course = dataCourse.find((course) => course.key === key);

        if (course && course.danhSachSinhVien?.length !== 0) {
            toast.error('Không thể đóng lớp đã có sinh viên đăng ký');
        } else {
            try {
                const response = await fetch('http://localhost:3001/course/delete', {
                    method: 'POST',
                    body: JSON.stringify({ key }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const rs = response.json();

                    rs.then((result) => {
                        if (result.course.status === 'fail') {
                            toast.error(result.course.message);
                        } else {
                            toast.success(result.course.message);
                            data.DanhSachHocPhan = result.course.DSHP;
                            localStorage.setItem('myDataKey', JSON.stringify(data));

                            setIsModalVisible(false);
                            setRerender(!rerender);
                        }
                    });
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra');
            }
        }
    };

    const handleCreateCourse = async (e: any) => {
        const formattedValues = {
            ...e,
            startDate: e.startDate.format('YYYY-MM-DD'),
        };

        try {
            const response = await fetch('http://localhost:3001/course/create', {
                method: 'POST',
                body: JSON.stringify(formattedValues),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const rs = response.json();

                rs.then((result) => {
                    if (result.course.status === 'fail') {
                        toast.error(result.course.message);
                    } else {
                        toast.success(result.course.message);
                        data.DanhSachHocPhan = result.course.DSHP;
                        localStorage.setItem('myDataKey', JSON.stringify(data));

                        setIsModalVisible(false);
                        setRerender(!rerender);
                        form.resetFields();
                    }
                });
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi tạo học phần');
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
        console.log(dataCourse);

        form.setFieldsValue({
            tenHocPhan: dataCourse[0].tenMonHoc,
            maHP: dataCourse[0].maLopHocPhan,
            tinChi: dataCourse[0].soTinChi,
            soLuong: dataCourse[0].soLuong.split('/')[1],
        });
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
        const selectedRow = dataToShow.find((item: any) => item.key === selectedRowKeys[0]);

        const courseSeleted = data.DanhSachHocPhan.find((item: any) => item._id === selectedRow.key);
        console.log(courseSeleted);

        let sinhVien = 0;

        if (courseSeleted.danhSachSinhVien) {
            sinhVien = courseSeleted.danhSachSinhVien.length;
        }
        setDataCourse3([
            {
                key: courseSeleted._id,
                maLopHocPhan: courseSeleted.maLopHocPhan,
                tenMonHoc: courseSeleted.tenMonHoc,
                soLuong: `${sinhVien}/${courseSeleted.soLuong}`,
                trangThai: courseSeleted.trangThai,
                soTinChi: courseSeleted.soTinChi,
                tenNhomThucHanh: courseSeleted.tenNhomThucHanh,
                tenGiaoVien: courseSeleted.thongTinLich[0].tenGV,
                soTietLT: courseSeleted.soTietLT,
                soTietTH: courseSeleted.soTietTH,
                danhSachSinhVien: courseSeleted.danhSachSinhVien,
            },
        ]);
    };

    useEffect(() => {
        // Hiển thị dataCourse khi rerender thay đổi
    }, [rerender, dataCourse]);

    const columns = [
        {
            title: 'Mã Lớp HP',
            dataIndex: 'maLopHocPhan',
            key: 'maLopHocPhan',
            width: 120,
            align: 'center',
        },
        {
            title: 'Tên Môn Học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
            width: 150,
        },
        {
            title: 'Số Tín Chỉ',
            dataIndex: 'soTinChi',
            key: 'soTinChi',
            width: 100,
            align: 'center',
        },

        dataCourse.some((course) => course.tenNhomThucHanh !== '')
            ? {
                  title: 'Nhóm Thực Hành',
                  dataIndex: 'tenNhomThucHanh',
                  key: 'tenNhomThucHanh',
                  width: 150,
              }
            : {
                  title: 'Nhóm Thực Hành',
                  width: 150,
                  align: 'center',
                  render: () => <CloseCircleOutlined style={{ fontSize: '20px', color: 'red' }} />,
              },

        {
            title: 'Trạng Thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            align: 'center',
        },
        {
            title: 'Tên Giáo Viên',
            dataIndex: 'tenGiaoVien',
            key: 'tenGiaoVien',
            width: 120,
            align: 'center',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            width: 90,
            align: 'center',
        },

        // xử lý ở đây chọn ra những dataCourse có trạng thái là 'Đã mở đăng kí' thì mới hiển thị cột xác nhận bên dưới
        {
            title: ' ',
            key: 'confirm',
            width: 60,
            align: 'center',
            render: (text, record) =>
                record.trangThai === 'Đã mở đăng kí' ? (
                    <Button type="primary" icon={<CheckOutlined />} onClick={() => handleConfirm(record.key)}>
                        Xác nhận mở lớp
                    </Button>
                ) : null,
        },
        {
            title: ' ',
            key: 'cancel',
            width: 60,
            align: 'center',
            render: (text: any, record: any) => (
                <Button
                    danger={true}
                    icon={<CloseCircleOutlined style={{ color: 'red' }} />}
                    onClick={() => handleCancel(record.key)}
                >
                    Hủy lớp
                </Button>
            ),
        },
    ];

    const columns2 = [
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
            title: 'Mã Lớp HP',
            dataIndex: 'maLopHocPhan',
            key: 'maLopHocPhan',
            width: 120,
            align: 'center',
        },
        {
            title: 'Tên Môn Học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
            width: 150,
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 100,
            align: 'center',
        },
        {
            title: 'Tên Giáo Viên',
            dataIndex: 'tenGiaoVien',
            key: 'tenGiaoVien',
            width: 120,
            align: 'center',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            width: 90,
            align: 'center',
        },
        {
            title: ' ',
            key: 'cancel',
            width: 60,
            align: 'center',
            render: (text: any, record: any) => (
                <Button
                    danger={true}
                    icon={<CloseCircleOutlined style={{ color: 'red' }} />}
                    onClick={() => handleCancel(record.key)}
                >
                    Hủy lớp
                </Button>
            ),
        },
    ];

    const columns3 = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 60,
            align: 'center',
            responsive: ['sm'], // Hiển thị từ màn hình small trở lên
        },
        {
            title: 'Họ Tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
            width: 120,
            align: 'center',
        },
        {
            title: 'Mã Sinh Viên',
            dataIndex: 'maSinhVien',
            key: 'maSinhVien',
            width: 150,
        },
        {
            title: 'Giới Tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
            width: 100,
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 100,
            align: 'center',
        },
    ];

    return (
        <>
            <AdminNavbar />
            <ToastContainer />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <div className="chitietmonhoc-content">
                    <div className="title">
                        {/* <h1>{`Danh sách học phần ${dataCourse ? dataCourse[0].tenMonHoc : ''}`}</h1> */}
                        <h1>Danh sách học phần đang mở đăng kí</h1>
                    </div>
                    <div className="course-table">
                        <Table
                            columns={columns}
                            dataSource={dataCourse}
                            pagination={false}
                            // locale={{
                            //     emptyText: (
                            //         <Empty
                            //             imageStyle={{
                            //                 height: 60, // Chiều cao của icon empty
                            //             }}
                            //             description={<span>Không có dữ liệu</span>}
                            //         />
                            //     ),
                            // }}
                            scroll={{ x: true }}
                        />
                    </div>
                    <div className="addCourseBtn">
                        <Button type="primary" style={{ width: '200px' }} onClick={showModal}>
                            <div>Tạo học phần</div>
                        </Button>
                        <Modal
                            title="Thêm Học Phần"
                            visible={isModalVisible}
                            onCancel={handleCancelModal}
                            footer={null}
                        >
                            <Form form={form} layout="vertical" onFinish={handleCreateCourse}>
                                <Form.Item
                                    name="maHP"
                                    label="Mã Học Phần"
                                    rules={[{ required: true, message: 'Vui lòng nhập mã học phần' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="tenHocPhan"
                                    label="Tên Học Phần"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên học phần' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="tinChi"
                                    label="Tín Chỉ"
                                    rules={[{ required: true, message: 'Vui lòng nhập số tín chỉ' }]}
                                >
                                    <InputNumber min={1} />
                                </Form.Item>
                                <Form.Item
                                    name="startDate"
                                    label="Ngày Bắt Đầu"
                                    rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                                >
                                    <DatePicker format="YYYY-MM-DD" />
                                </Form.Item>
                                <Form.Item
                                    name="tenGV"
                                    label="Tên Giảng Viên"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên giảng viên' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="soLuong"
                                    label="Số Lượng Sinh Viên"
                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                                >
                                    <InputNumber min={1} />
                                </Form.Item>
                                <Form.Item
                                    name="tietHoc"
                                    label="Tiết Học"
                                    rules={[{ required: true, message: 'Vui lòng nhập tiết học' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="phongHoc"
                                    label="Phòng Học"
                                    rules={[{ required: true, message: 'Vui lòng nhập phòng học' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="tenNhomThucHanh" label="Tên Nhóm Thực Hành">
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Tạo Học Phần
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    <div style={{ borderTop: '1px solid #ccc', marginTop: '2vh' }} className="title">
                        {/* <h1>{`Danh sách học phần ${dataCourse ? dataCourse[0].tenMonHoc : ''}`}</h1> */}
                        <h1>Danh sách học phần đã chấp nhận mở lớp</h1>
                    </div>
                    <div className="course-table">
                        <Table columns={columns2} dataSource={dataCourse2} pagination={false} scroll={{ x: true }} />
                    </div>
                    <div style={{ borderTop: '1px solid #ccc', marginTop: '2vh' }} className="title">
                        {/* <h1>{`Danh sách học phần ${dataCourse ? dataCourse[0].tenMonHoc : ''}`}</h1> */}
                        <h1>Danh sách sinh viên</h1>
                    </div>
                    <div className="course-table">
                        <Table columns={columns3} dataSource={[]} pagination={false} scroll={{ x: true }} />
                    </div>
                </div>
                {/* <Layout>
                        <Content>
                        <div className="ChiTietMonHoc_Content ">
                            <h2>Lịch theo môn {tenMon.tenMonHoc} </h2>
                            <div>
                                <button onClick={toggleModelVisibility}>thêm lịch</button>
                            </div>
                            <div className={`ChiTietMonHoc_Lich  ${isModelVisible ? 'faded' : ''}`}>
                                <React.Fragment>
                                    <ExternalViewSwitcher
                                        currentViewName={currentViewName}
                                        onChange={currentViewNameChange}
                                    />
                                    <Paper>
                                        <Scheduler data={data} height={620}>
                                            <ViewState
                                                defaultCurrentDate="2023-10-24"
                                                currentViewName={currentViewName}
                                            />
                                            <WeekView
                                                startDayHour={5.5} // Giờ bắt đầu buổi sáng
                                                endDayHour={21} // Giờ kết thúc buổi tối
                                                cellDuration={60}
                                            />
                                            <MonthView />
                                            <Toolbar />
                                            <DateNavigator />
                                            <TodayButton />

                                            <Appointments
                                                appointmentComponent={
                                                    currentViewName === 'Week' ? Appointment : customAppointment
                                                }
                                            />
                                            {currentViewName === 'Month' ? (
                                                <AppointmentTooltip showCloseButton />
                                            ) : (
                                                <></>
                                            )}
                                        </Scheduler>
                                    </Paper>
                                </React.Fragment>
                            </div>
                            <div className="ChiTietMonHoc_Form">
                                {isModelVisible && (
                                    <div className="form-container">
                                        <h2>Thông tin lịch</h2>
                                        <div onClick={toggleClose} className="form-button-close">
                                            <div className="form-button-close-x">x</div>
                                        </div>
                                        <div>
                                            <label className="form-label">Tên môn :</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                name="title"
                                                value={selectedAppointment.title}
                                                // onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Tên giảng viên: </label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                name="tenGV"
                                                value={selectedAppointment.tenGV}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Phòng học: </label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                name="phongHoc"
                                                value={selectedAppointment.phongHoc}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Tiết học: </label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                name="tietHoc"
                                                value={selectedAppointment.tietHoc}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Ghi chú: </label>
                                            <textarea
                                                className="form-textarea"
                                                name="ghiChu"
                                                value={selectedAppointment.ghiChu}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <button onClick={handleUpdateSchedule} className="form-button">
                                                Cập nhật
                                            </button>
                                            <button onClick={handleCancelSchedule} style={{ marginLeft: '5px' }}>
                                                Tạm hoãn
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Content>
                </Layout> */}
            </Layout>
            <Footer />
        </>
    );
};

export default ChiTietMonHoc;
