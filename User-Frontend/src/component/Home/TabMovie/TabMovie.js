import React from 'react';
class TabMovie extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tab-movies">
                                <div className="tab-movies-line">
                                    <ul className="nav nav-tabs movie-home">
                                        <li className="active">
                                            <a href="#tab_default_1" data-toggle="tab">Phim đang chiếu</a>
                                        </li>
                                        <li>
                                            <a href="#tab_default_2" data-toggle="tab">Phim sắp chiếu</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="tab_default_1" className="tab-pane active">
                                            <div className="row movies-group animated fadeInUp">
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/Nang3LoiHuaCuaCha.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">Nắng 3: Lời Hứa Của Cha</h4>
                                                        <h4 className="vn upper-text">Nắng 3: Lời Hứa Của Cha</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/TruyTimPhepThuat.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <i />
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">Onward</h4>
                                                        <h4 className="vn upper-text">Truy Tìm Phép Thuật</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/AcMongBenHo.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">Lake Of Death</h4>
                                                        <h4 className="vn upper-text">Ác Mộng Bên Hồ</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/CanHoCuaQuy.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">32 Malasana Street</h4>
                                                        <h4 className="vn upper-text">Căn Hộ Của Quỷ</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/DauAn.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">A SOUTH AFRICAN HORROR STORY</h4>
                                                        <h4 className="vn upper-text">Dấu Ấn</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/KeDaoTauGiacMo.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">HeartBeatsKẻ đào tẩu giấc mơ</h4>
                                                        <h4 className="vn upper-text">Kẻ đào tẩu giấc mơ</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12 col-xs-12 pull-right">
                                                    <a href="/" className="btn secondary fl-right">Xem thêm</a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phim sắp chiếu */}
                                        <div id="tab_default_2" className="tab-pane">
                                            <div className="row movies-group animated fadeInUp">
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/CanHoCuaQuy.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">32 Malasana Street</h4>
                                                        <h4 className="vn upper-text">Căn Hộ Của Quỷ</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/DauAn.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">A SOUTH AFRICAN HORROR STORY</h4>
                                                        <h4 className="vn upper-text">Dấu Ấn</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/KeDaoTauGiacMo.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">Kẻ đào tẩu giấc mơ</h4>
                                                        <h4 className="vn upper-text" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/Nang3LoiHuaCuaCha.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">Nắng 3: Lời Hứa Của Cha</h4>
                                                        <h4 className="vn upper-text" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/TruyTimPhepThuat.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <i />
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">Onward</h4>
                                                        <h4 className="vn upper-text">Truy Tìm Phép Thuật</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                    <div className="article-movie-home">
                                                        <img src="htv/website/images/AcMongBenHo.jpg"
                                                            className="lazy loaded" />
                                                        <a href="/">
                                                            <div className="decription-hover overlay">
                                                                <div className="movies-content">
                                                                    <div className="group">
                                                                        <div className="btn secondary-white">mua vé</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="title-movie">
                                                        <h4 className="upper-text">Lake Of Death</h4>
                                                        <h4 className="vn upper-text">Ác Mộng Bên Hồ</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12 col-xs-12 pull-right">
                                                    <a href="/" className="btn secondary fl-right">Xem thêm</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TabMovie;