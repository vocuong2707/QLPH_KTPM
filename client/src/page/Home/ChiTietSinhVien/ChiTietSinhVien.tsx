import NavBar from '../../../components/NavBar/NavBar';
import avt from '../../../assets/images/avt4.jpg';
import './ChiTietSinhVien.scss';

export const ChiThietSinhVien = () => {
    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    const localDateTime = (day: Date) => {
        const result = new Date(day);

        return result.toLocaleDateString();
    };

    return (
        <>
            <NavBar />
            <div className="ChiTietSinhVien_content-coponent">
                <div className="ChiTietSinhVien_my-info">
                    <div className="ChiTietSinhVien_title-info">
                        <span>Thông tin Học vấn</span>
                    </div>
                    <hr />
                    <div className="ChiTietSinhVien_avt">
                        {data.data.ThongTinCaNhan.anhDaiDien != null ? (
                            <img src={data.data.ThongTinCaNhan.anhDaiDien} alt="" />
                        ) : (
                            <img src={avt} alt="" />
                        )}
                    </div>
                    <div className="ChiTietSinhVien_text-info">
                        <ul>
                            <li>
                                MSSV: <b>{data.data.ThongTinCaNhan.maSV}</b>
                            </li>
                            <li>
                                Họ tên: <b>{data.data.ThongTinCaNhan.hoTenSV}</b>
                            </li>
                            <li>
                                Giới tính: <b>{data.data.ThongTinCaNhan.gioiTinh}</b>
                            </li>
                            <li>
                                Ngày sinh: <b>{data.data.ThongTinCaNhan.ngaySinh}</b>
                            </li>
                            <li>
                                Nơi sinh: <b>{data.data.ThongTinCaNhan.noiSinh}</b>
                            </li>
                        </ul>
                    </div>
                    <div className="ChiTietSinhVien_text-info2">
                        <ul>
                            <li>
                                Lớp học: <b>{data.data.ThongTinHocVan.lopDanhNghia}</b>
                            </li>
                            <li>
                                Khóa học: <b>{data.data.ThongTinHocVan.nienKhoa}</b>
                            </li>
                            <li>
                                Bậc đào tạo: <b>{data.data.ThongTinHocVan.bacDaoTao}</b>
                            </li>
                            <li>
                                Loại hình đào tạo: <b>{data.data.ThongTinHocVan.loaiHinhDaoTao}</b>
                            </li>
                            <li>
                                Ngành: <b>{data.data.ThongTinHocVan.chuyenNganh}</b>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="ChiTietSinhVien_my-info">
                    <div className="ChiTietSinhVien_title-info">
                        <span>Thông tin cá nhân</span>
                    </div>
                    <hr />
                    <div className="ChiTietSinhVien_container">
                        <div className="ChiTietSinhVien_text-info">
                            <ul>
                                <li>
                                    Ngày Sinh: <b>{data.data.ThongTinCaNhan.ngaySinh}</b>
                                </li>
                                <li>
                                    Dân tộc: <b>{data.data.ThongTinCaNhan.danToc}</b>
                                </li>
                                <li>
                                    Tôn Giáo: <b>{data.data.ThongTinCaNhan.tonGiao}</b>
                                </li>

                                <li>
                                    SĐT : <b>{data.data.ThongTinCaNhan.SDT}</b>
                                </li>
                            </ul>
                        </div>
                        <div className="ChiTietSinhVien_text-info">
                            <ul>
                                <li>
                                    Diện danh sách: <b>Hộ nghèo</b>
                                </li>
                                <li>
                                    Ngày vào Đảng: <b>Không</b>
                                </li>
                                <li>
                                    Ngày vào đoàn: <b>26/3/2017</b>
                                </li>
                                <li>
                                    Email: <b>{data.data.ThongTinCaNhan.email}</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="ChiTietSinhVien_container">
                        <div className="ChiTietSinhVien_text-info">
                            <ul>
                                <li>
                                    Số CMND: <b>{data.data.ThongTinCaNhan.CMND.soCMND} </b>
                                </li>
                                <li>
                                    Ngày cấp: <b>{localDateTime(data.data.ThongTinCaNhan.CMND.ngayCap)}</b>
                                </li>

                                <li>
                                    Nơi cấp: <b>{data.data.ThongTinCaNhan.CMND.noiCap}</b>
                                </li>
                            </ul>
                        </div>
                        <div className="ChiTietSinhVien_text-info">
                            <ul>
                                <li>
                                    Khu vực: <b>NT2</b>
                                </li>
                                <li>
                                    Đối tượng: <b>Nông thôn 2</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="ChiTietSinhVien_text-info-11">
                        <div className="ChiTietSinhVien_text-info-111">
                            Nơi sinh: <b>{data.data.ThongTinCaNhan.noiSinh}</b>
                        </div>
                        <div className="ChiTietSinhVien_text-info-111">
                            Hộ khẩu thường trú: <b>{data.data.ThongTinCaNhan.hoKhauThuongTru}</b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
