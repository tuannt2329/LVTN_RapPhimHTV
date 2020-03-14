import React from 'react';
class Header extends React.Component {
    render() {

        return (
            <div className="htv-nav">
                <div className="container">
                    <nav>
                        <ul className="primary-nav">
                            <li>
                                <a href="/">Lịch chiếu</a>
                            </li>
                            <li className="sub-nav">
                                <a href="/">Phim</a>
                                <div id="sub-menu">
                                    <ul className="undefined">
                                        <li>
                                            <a href="phim-dang-chieu">Phim đang chiếu</a>
                                        </li>
                                        <li>
                                            <a href="phim-sap-chieu">Phim sắp chiếu</a>
                                        </li>
                                    </ul>
                                </div>
                                <div id="sub-menu-movie" className="hidden-sm hidden-xs">
                                    <div className="visible-lg-block">
                                        <div className="row submenu-title">
                                            <div className="col-sm-12">
                                                <h3><a href="phim-dang-chieu">Phim đang chiếu</a></h3>
                                            </div>
                                        </div>
                                        <div className="row movies-group-header">
                                            <div className="col-sm-3">
                                                <article style={{ backgroundImage: 'url(htv/website/images/Nang3LoiHuaCuaCha.jpg)' }}
                                                    className="article-movie-header">
                                                    <a href="/dat-ve/nang-3-loi-hua-cua-cha" style={{ width: '100%' }}>
                                                        <figure>
                                                            <figcaption className="overlay">
                                                                <div className="movies-content-header">
                                                                    <htv-icon-movie />
                                                                    <div className="group">
                                                                        <div className="btn secondary-white btn-header">Mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </figcaption>
                                                        </figure>
                                                    </a>
                                                </article>
                                                <div className="title-movie-header">
                                                    <h4 className="upper-text">Nắng 3: Lời Hứa Của Cha</h4>
                                                    <h4 className="vn upper-text">Nắng 3: Lời Hứa Của Cha</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <article style={{ backgroundImage: 'url(htv/website/images/TruyTimPhepThuat.jpg)' }}
                                                    className="article-movie-header">
                                                    <a href="/dat-ve/onward" style={{ width: '100%' }}>
                                                        <figure>
                                                            <figcaption className="overlay">
                                                                <div className="movies-content-header">
                                                                    <htv-icon-movie />
                                                                    <div className="group">
                                                                        <div className="btn secondary-white btn-header">Mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </figcaption>
                                                        </figure>
                                                    </a>
                                                </article>
                                                <div className="title-movie-header">
                                                    <h4 className="upper-text">Onward</h4>
                                                    <h4 className="vn upper-text">Truy Tìm Phép Thuật</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <article style={{ backgroundImage: 'url(htv/website/images/AcMongBenHo.jpg)' }}
                                                    className="article-movie-header">
                                                    <a href="/dat-ve/lake-of-death" style={{ width: '100%' }}>
                                                        <figure>
                                                            <figcaption className="overlay">
                                                                <div className="movies-content-header">
                                                                    <htv-icon-movie />
                                                                    <div className="group">
                                                                        <div className="btn secondary-white btn-header">Mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </figcaption>
                                                        </figure>
                                                    </a>
                                                </article>
                                                <div className="title-movie-header">
                                                    <h4 className="upper-text">Lake Of Death</h4>
                                                    <h4 className="vn upper-text">Ác Mộng Bên Hồ</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <article style={{ backgroundImage: 'url(htv/website/images/CanHoCuaQuy.jpg)' }}
                                                    className="article-movie-header">
                                                    <a href="/dat-ve/32-malasana-street" style={{ width: '100%' }}>
                                                        <figure>
                                                            <figcaption className="overlay">
                                                                <div className="movies-content-header">
                                                                    <htv-icon-movie />
                                                                    <div className="group">
                                                                        <div className="btn secondary-white btn-header">Mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </figcaption>
                                                        </figure>
                                                    </a>
                                                </article>
                                                <div className="title-movie-header">
                                                    <h4 className="upper-text">32 Malasana Street</h4>
                                                    <h4 className="vn upper-text">Căn Hộ Của Quỷ</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row submenu-title">
                                            <div className="col-sm-12">
                                                <h3>
                                                    <a href="phim-sap-chieu">Phim sắp chiếu</a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="row movies-group-header">
                                            <div className="col-sm-3">
                                                <article style={{ backgroundImage: 'url(htv/website/images/BloodShot.jpg)' }}
                                                    className="article-movie-header">
                                                    <a href="/dat-ve/bloodshot" style={{ width: '100%' }}>
                                                        <figure><figcaption className="overlay">
                                                            <div className="movies-content-header">
                                                                <htv-icon-movie />
                                                                <div className="group">
                                                                    <div className="btn secondary-white btn-header">Mua vé</div>
                                                                </div>
                                                            </div>
                                                        </figcaption>
                                                        </figure>
                                                    </a>
                                                </article>
                                                <div className="title-movie-header">
                                                    <h4 className="upper-text">Bloodshot</h4>
                                                    <h4 className="vn upper-text">Bắn súng</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <article style={{ backgroundImage: 'url(htv/website/images/KeDaoTauGiacMo.jpg)' }}
                                                    className="article-movie-header">
                                                    <a href="/dat-ve/heartbeats" style={{ width: '100%' }}>
                                                        <figure>
                                                            <figcaption className="overlay">
                                                                <div className="movies-content-header">
                                                                    <htv-icon-movie />
                                                                    <div className="group">
                                                                        <div className="btn secondary-white btn-header">Mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </figcaption>
                                                        </figure>
                                                    </a>
                                                </article>
                                                <div className="title-movie-header">
                                                    <h4 className="upper-text">Heartbeats</h4>
                                                    <h4 className="vn upper-text">Kẻ đào tẩu giấc mơ</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <article style={{ backgroundImage: 'url(htv/website/images/DauAn.jpg)' }} className="article-movie-header">
                                                    <a href="/dat-ve/8-a-south-african-horror-story" style={{ width: '100%' }}><figure>
                                                        <figcaption className="overlay">
                                                            <div className="movies-content-header">
                                                                <htv-icon-movie />
                                                                <div className="group">
                                                                    <div className="btn secondary-white btn-header">Mua vé</div>
                                                                </div>
                                                            </div>
                                                        </figcaption>
                                                    </figure>
                                                    </a>
                                                </article>
                                                <div className="title-movie-header">
                                                    <h4 className="upper-text">8: A South African Horror Story</h4>
                                                    <h4 className="vn upper-text">Dấu Ấn Vô Cực</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <article style={{ backgroundImage: 'url(htv/website/images/IStillBelieve.jpg)' }} className="article-movie-header"><a href="/dat-ve/i-still-believe" style={{ width: '100%' }}><figure>
                                                    <figcaption className="overlay">
                                                        <div className="movies-content-header">
                                                            <htv-icon-movie />
                                                            <div className="group">
                                                                <div className="btn secondary-white btn-header">Mua vé</div>
                                                            </div>
                                                        </div>
                                                    </figcaption>
                                                </figure>
                                                </a>
                                                </article>
                                                <div className="title-movie-header">
                                                    <h4 className="upper-text">I Still Believe</h4>
                                                    <h4 className="vn upper-text">Vì Anh Vẫn Tin</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="sub-nav">
                                <a href="/">Thể loại phim</a>
                                <div id="sub-menu">
                                    <ul>
                                        <li>
                                            <a href="/">Phim aventure</a>
                                        </li>
                                        <li>
                                            <a href="/">Phim hành động</a>
                                        </li>
                                        <li>
                                            <a href="/">Phim bí ẩn</a>
                                        </li>
                                        <li>
                                            <a href="/">Phim hài</a>
                                        </li>
                                        <li>
                                            <a href="/">Phim lãng mạn</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="sub-nav">
                                <a href="/">Điện ảnh</a>
                                <div id="sub-menu">
                                    <ul>
                                        <li><a href="/">Đạo diễn</a></li>
                                        <li><a href="/">Diễn viên</a></li>
                                        <li><a href="/">Tin tức phim</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="sub-nav">
                                <a href="/">Hệ thống rạp</a>
                                <div id="sub-menu">
                                    <ul>
                                        <li><a href="/">HTV Thủ Đức</a></li>
                                        <li><a href="/">HTV Gò Vấp</a></li>
                                        <li><a href="/">HTV Quang Trung</a></li>
                                        <li><a href="/">HTV Nguyễn Huệ</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li><a href="/">Giá vé</a></li>
                            <li><a href="/">Thành viên</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
export default Header;