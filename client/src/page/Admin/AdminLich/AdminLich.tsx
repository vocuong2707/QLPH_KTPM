import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ViewState } from '@devexpress/dx-react-scheduler';

import {
    Scheduler,
    WeekView,
    MonthView,
    Appointments,
    AppointmentTooltip,
    Toolbar,
    DateNavigator,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { MonHoc } from '../../../../DataSample';


interface AppointmentData {
    startDate: Date,
    endDate: Date,
    phongHoc: string,
    ghiChu: string,
    tenGV: string,
    tietHoc: string,

}

const ExternalViewSwitcher = ({
    currentViewName,
    onChange,
}: {
    currentViewName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <RadioGroup
        aria-label="Views"
        style={{ flexDirection: 'row' }}
        name="views"
        value={currentViewName}
        onChange={onChange}
    >
        <FormControlLabel value="Week" control={<Radio />} label="Lịch theo Tuần" />
        <FormControlLabel value="Month" control={<Radio />} label="Lịch theo Tháng" />
    </RadioGroup>
);

const AdminLich: React.FC<{ maLich: string }> = ({ maLich }) => {
    //const [data] = useState(MonHoc.data.roomData[0].thongTinLich);
    const [data, setData] = useState([]);
    useEffect(() => {
        const tenMonHocCanTim = maLich; // Tên môn học bạn muốn tìm
        const monHocDaTim = MonHoc.data.roomData.find(item => item.maLopHocPhan === tenMonHocCanTim);
        if (monHocDaTim) {
            // Nếu tìm thấy môn học, cập nhật data bằng môn học đó
            setData(monHocDaTim?.thongTinLich);
        }
    }, [maLich]);


    const [currentViewName, setCurrentViewName] = useState('Week');

    const currentViewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentViewName(e.target.value);
    };

    const Appointment: React.FC<{
        children: React.ReactNode;
        style: React.CSSProperties;
        data: AppointmentData;
    }> = ({ children, style, data, ...restProps }) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                /* backgroundColor: '#FFC107', */
                borderRadius: '8px',
            }}
        >
            {children}
            <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
                GV: <span style={{ color: 'red' }}>{data.tenGV}</span>
            </div>
            <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
                Tiết: <span style={{ color: 'red' }}>{data.tietHoc}</span>
            </div>
            <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
                Phòng: <span style={{ color: 'red' }}>{data.phongHoc}</span>
            </div>
            <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
                Ghi chú: <span style={{ color: 'red' }}>{data.ghiChu}</span>{' '}
            </div>
        </Appointments.Appointment>
    );

    const customAppointment: React.FC<{
        children: React.ReactNode;
        style: React.CSSProperties;
    }> = ({ children, style, ...restProps }) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                /* backgroundColor: '#FFC107', */
                borderRadius: '8px',
            }}
        >
            {children}
        </Appointments.Appointment>
    );

    return (
        <React.Fragment>
            <ExternalViewSwitcher currentViewName={currentViewName} onChange={currentViewNameChange} />
            <Paper>
                <Scheduler data={data} height={620}>
                    <ViewState defaultCurrentDate="2023-10-24" currentViewName={currentViewName} />
                    <WeekView
                        startDayHour={5} // Giờ bắt đầu buổi sáng
                        endDayHour={22} // Giờ kết thúc buổi tối
                        cellDuration={60}
                    // timeTableCellComponent={CustomTimeTableCell}
                    />
                    <MonthView />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />

                    <Appointments appointmentComponent={currentViewName === 'Week' ? Appointment : customAppointment} />
                    {currentViewName === 'Month' ? <AppointmentTooltip showCloseButton /> : <></>}
                </Scheduler>
            </Paper>
        </React.Fragment>
    );
};

export default AdminLich;
