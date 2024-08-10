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

const CustomTimeTableCell: React.FC<{ startDate: Date; endDate: Date; resources: any; groupingInfo: any }> = ({
    startDate,
    ...restProps
}) => {
    const hour = startDate.getHours();
    let timeSlotText = '';

    if (hour === 6) {
        timeSlotText = 'Buổi sáng';
    } else if (hour === 12) {
        timeSlotText = 'Buổi chiều';
    } else if (hour === 18) {
        timeSlotText = 'Buổi tối';
    }

    return (
        <WeekView.TimeTableCell
            {...restProps}
            startDate={startDate}
            style={{
                ...restProps.style,
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            {timeSlotText && <div style={{ color: '#888', fontSize: '0.75em' }}>{timeSlotText}</div>}
        </WeekView.TimeTableCell>
    );
};

const LearningCalendar: React.FC = () => {
    const [currentViewName, setCurrentViewName] = useState('Week');

    const currentViewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentViewName(e.target.value);
    };

    const storedData = localStorage.getItem('myDataKey');
    const thongtin = storedData ? JSON.parse(storedData) : [];
    const [data, setNewData] = useState([]);
    const [appointmentData, setAppointmentData] = useState(null);

    useEffect(() => {
        const updatedData: any[] = [];

        thongtin.lich.forEach((monHoc: any) => {
            monHoc.thongTinLich.forEach((lich: any) => {
                const localEndDate = new Date(lich.endDate).toLocaleString('en-US', { timeZone: 'UTC' });
                const localStartDate = new Date(lich.startDate).toLocaleString('en-US', { timeZone: 'UTC' });

                updatedData.push({
                    ...lich,
                    endDate: localEndDate,
                    startDate: localStartDate,
                });
            });
        });

        setNewData(updatedData);
    }, []);

    const Appointment: React.FC<{
        children: React.ReactNode;
        style: React.CSSProperties;
        data: any;
    }> = ({ children, style, data, ...restProps }) => {
        const dynamicBackgroundColor = data.ghiChu === 'Tạm ngưng' ? 'rgb(248, 200, 195)' : '';
        return (
            <Appointments.Appointment
                {...restProps}
                style={{
                    ...style,
                    backgroundColor: dynamicBackgroundColor,
                    borderRadius: '8px',
                    fontSize: '12px', // Tăng kích thước chữ
                }}
            >
                {children}
                <div style={{ color: '#000', paddingLeft: '4%' }}>
                    GV: <span style={{ color: 'red' }}>{data.tenGV}</span>
                </div>
                <div style={{ color: '#000', paddingLeft: '4%' }}>
                    Tiết: <span style={{ color: 'red' }}>{data.tietHoc}</span>
                </div>
                <div style={{ color: '#000', paddingLeft: '4%' }}>
                    Phòng: <span style={{ color: 'red' }}>{data.phongHoc}</span>
                </div>
                <div style={{ color: '#000', paddingLeft: '4%' }}>
                    Ghi chú: <span style={{ color: 'red' }}>{data.ghiChu}</span>
                </div>
            </Appointments.Appointment>
        );
    };

    const customAppointment: React.FC<{
        children: React.ReactNode;
        style: React.CSSProperties;
    }> = ({ children, style, ...restProps }) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                borderRadius: '8px',
                fontSize: '14px', // Tăng kích thước chữ
            }}
        >
            {children}
        </Appointments.Appointment>
    );

    const CustomAppointmentTooltipContent = ({ appointmentData, ...restProps }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <div style={{ padding: '10px' }}>
                <div>
                    <strong>Tên môn học:</strong> {appointmentData.title}
                </div>
                <div>
                    <strong>Giáo viên:</strong> {appointmentData.tenGV}
                </div>
                <div>
                    <strong>Phòng học:</strong> {appointmentData.phongHoc}
                </div>
                <div>
                    <strong>Tiết học:</strong> {appointmentData.tietHoc}
                </div>
                <div>
                    <strong>Ghi chú:</strong> {appointmentData.ghiChu}
                </div>
            </div>
        </AppointmentTooltip.Content>
    );

    return (
        <React.Fragment>
            <ExternalViewSwitcher currentViewName={currentViewName} onChange={currentViewNameChange} />
            <Paper>
                <Scheduler data={data} height={620}>
                    <ViewState defaultCurrentDate="2023-10-24" currentViewName={currentViewName} />
                    <WeekView
                        startDayHour={6}
                        endDayHour={22}
                        cellDuration={60}
                        timeTableCellComponent={CustomTimeTableCell}
                    />
                    <MonthView />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments appointmentComponent={currentViewName === 'Week' ? Appointment : customAppointment} />
                    <AppointmentTooltip
                        showCloseButton
                        showOpenButton
                        contentComponent={CustomAppointmentTooltipContent}
                    />
                </Scheduler>
            </Paper>
        </React.Fragment>
    );
};

export default LearningCalendar;
