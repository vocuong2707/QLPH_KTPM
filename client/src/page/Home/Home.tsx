import React from 'react';

import NavBar from '../../components/NavBar/NavBar.tsx';
import Sider from '../../components/Sider/Sider.tsx';
import Content from '../../components/Content/Content.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

const Home = () => {
    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);
    console.log(data);

    return (
        <>
            <ToastContainer />
            <NavBar />
            <Sider />
            <Content />
            <Outlet />
            <Footer />
        </>
    );
};
export default Home;
