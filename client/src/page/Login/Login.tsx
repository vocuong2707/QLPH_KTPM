import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ToastContainer, toast } from 'react-toastify';
import { RootState } from '../../app/store';
import { loginAction } from '../../redux/reducer/login/LoginReducer';
import Loading from '../../share/loading/Loading';
import './login.scss';
import 'react-toastify/dist/ReactToastify.css';

import logo1 from '../../assets/images/tieude4.png';
import logo2 from '../../assets/images/tieude2.png';
import logo3 from '../../assets/images/tieude.png';
import slider1 from '../../assets/images/slide1.png';
import slider2 from '../../assets/images/slide2.png';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state: RootState) => state.loginReducer.isLoading);
    const isLoadingBlock = useAppSelector((state: RootState) => state.loginReducer.isLoadingBlock);
    const data: any = useAppSelector((state: RootState) => state.loginReducer.dataLogin);
    console.log(data);

    const handleSubmit = async (e: any) => {
        setUsername('');
        setPassword('');
        e.preventDefault();
        await dispatch(loginAction.reqGetDataLogin({ username, password }));
    };

    useEffect(() => {
        if (data.path) {
            const jsonData: any = JSON.stringify(data);
            localStorage.setItem('myDataKey', jsonData);
            window.location.href = data.path;
        }
        if (data.status === 'fail') {
            toast.error(data.message);
        }
    }, [data]);

    return (
        <React.Fragment>
            <Loading isShow={isLoading} isLoadingBlock={isLoadingBlock} />
            <ToastContainer />
            <div className="login-component">
                <div className="header">
                    <div className="logo-left">
                        <img src={logo1} alt="" />
                    </div>
                    <div className="logo-right">
                        <img src={logo2} alt="" />
                    </div>
                </div>
                <div className="content">
                    <div className="slider">
                        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={slider1} className="d-block" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={slider2} className="d-block" alt="..." />
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleAutoplaying"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleAutoplaying"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <div className="form-login">
                        <form action="/auth/login" method="POST">
                            <div className="form-header">
                                <img src={logo3} alt="" />
                            </div>
                            <div className="input-form">
                                <p className="title-form">Đăng nhập hệ thống</p>
                                <div className="username">
                                    <div className="title-name">Tài khoản</div>
                                    <div className="input-name">
                                        <div className="icon-user">
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Nhập tài khoản..."
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            id="name"
                                        />
                                    </div>
                                </div>
                                <div className="password">
                                    <div className="title-password">Mật khẩu</div>
                                    <div className="input-password">
                                        <div className="icon-key">
                                            <i className="fa-solid fa-key"></i>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Nhập mật khẩu..."
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button onClick={handleSubmit} className="btn-submit" /* onClick={handleSubmit} */>
                                    Đăng Nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
