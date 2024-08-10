import React from 'react';

import { Row, Col } from 'antd';
import logo from '../../assets/images/tieude.png';
import './footer.scss';

const Footer: React.FC = () => {
    return (
        <div className="footer-component">
            <Row className="row">
                <Col className="col1">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <p>
                        Chào mừng các bạn đến với Hệ thống học tập trực tuyến của trường Đại học Công nghiệp TP.HCM,
                        kênh thông tin cung cấp các khóa học trực tuyến của nhà trường cho các bạn sinh viên.
                    </p>
                </Col>
                <Col className="col2">
                    <h2>Liên kết</h2>
                    <p>
                        <a href="https://iuh.edu.vn/">Website nhà trường</a>
                    </p>
                    <p>
                        <a href="https://csm.iuh.edu.vn/">Website trung tâm QTHT</a>
                    </p>
                    <p>
                        <a href="">Cổng thông tin sinh viên</a>
                    </p>
                    <p>
                        <a href="">Các khóa học</a>
                    </p>
                </Col>
                <Col className="col3">
                    <h2>Liên hệ</h2>
                    <p>Trung tâm Quản trị Hệ thống - Trường Đại học Công nghiệp TP.HCM</p>
                    <p>
                        <i className="fa-solid fa-square-phone"></i> Phone : 0283.8940 390 - ext 838
                    </p>
                    <p>
                        <i className="fa-solid fa-envelope"></i> E-mail: <a href="">csm@iuh.edu.vn</a>
                    </p>
                </Col>
            </Row>
            <Row className="row2">
                <p>Copyright © 2024 - Phát triển bởi sinh viên: Ngô Hữu Nghị - Trần Bảo Dự - ĐHCN TP.HCM</p>
            </Row>
        </div>
    );
};

export default Footer;
