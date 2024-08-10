import React, { useState } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import { Card } from 'antd';
import LearningCalendar from './lich';

import './lichhoc.scss';

export const LichHoc = () => {
    return (
        <>
            <NavBar />
            <div className="calendar-component">
                <Card className="card">
                    <LearningCalendar />
                </Card>
            </div>
        </>
    );
};
