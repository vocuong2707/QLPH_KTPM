import React from 'react';
import { Layout } from 'antd';

import { Outlet } from 'react-router-dom';
import AdminSider from './AdminSider/AdminSider';
import AdminNavbar from './AdminNavbar/AdminNavbar';
import Footer from '../../components/Footer/Footer';
import './AdminHome.scss';

const { Content } = Layout;

const AdminHome: React.FC = () => {
    return (
        <div className="admin-home-component">
            <AdminNavbar />
            <Layout className="content">
                <AdminSider />
                <Layout>
                    <Content className="right">
                        {/* Đây là nơi hiển thị nội dung của các component */}
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </div>
    );
};

export default AdminHome;
