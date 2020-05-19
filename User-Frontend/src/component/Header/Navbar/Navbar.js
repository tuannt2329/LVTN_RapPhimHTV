import React from 'react';
class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.setStateFilms = this.setStateFilms.bind(this)
        this.state = {
            films: [],
            counter: 0
        }
    }

    setStateFilms = (data) => {
        console.log(data)
        this.setState({ films: data, counter: 1 })
    }

    handleOnclickFilm = (tenphim) => {
        sessionStorage.setItem("tenphim", tenphim);
    }

    render() {
        if (this.props.films[0] && this.state.counter === 0) {
            this.setStateFilms(this.props.films)
        }

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
                                            <a href="/">Phim đang chiếu</a>
                                        </li>
                                        <li>
                                            <a href="/">Phim sắp chiếu</a>
                                        </li>
                                    </ul>
                                </div>

                                <div id="sub-menu-movie" className="hidden-sm hidden-xs">
                                    <div className="visible-lg-block">
                                        <div className="row submenu-title">
                                            <div className="col-sm-12">
                                                <h3><a href="phim-dang-chieu">Phim đang chiếu</a></h3>
                                                {/* <h3><Link to ={'/allfilm', <TabMovie films={this.state.films}/>}>Phim đang chiếu</Link></h3> */}
                                            </div>
                                        </div>
                                        <div className="row movies-group-header">
                                            {this.state.films.map((item, index) =>
                                                ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))) ?
                                                    <div className="col-sm-3">
                                                        <article className="article-movie-header">
                                                            <img style={{ width: '100%', height: '100%' }}
                                                                key={index}
                                                                src={"http://localhost:8000/images/" + item.AnhBia} />

                                                            <a style={{ width: '100%' }}
                                                                href="/detailfilm"
                                                                onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
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
                                                            <h4 className="upper-text">{item.TenFilm}</h4>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                            )}
                                        </div>

                                        <div className="row submenu-title">
                                            <div className="col-sm-12">
                                                <h3>
                                                    <a href="/">Phim sắp chiếu</a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="row movies-group-header">
                                            {this.state.films.map((item, index) =>
                                                (Date.parse(item["NgayChieu"]) > Date.parse(Date())) ?
                                                    <div className="col-sm-3">
                                                        <article className="article-movie-header">
                                                            <img style={{ width: '100%', height: '100%' }}
                                                                key={index}
                                                                src={"http://localhost:8000/images/" + item.AnhBia} />
                                                            <a style={{ width: '100%' }}
                                                                href="/detailfilm"
                                                                onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
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
                                                            <h4 className="upper-text">{item.TenFilm}</h4>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                            )}
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
                            {/* <li className="sub-nav">
                                <a href="/">Hệ thống rạp</a>
                                <div id="sub-menu">
                                    <ul>
                                        <li><a href="/">HTV Thủ Đức</a></li>
                                        <li><a href="/">HTV Gò Vấp</a></li>
                                        <li><a href="/">HTV Quang Trung</a></li>
                                        <li><a href="/">HTV Nguyễn Huệ</a></li>
                                    </ul>
                                </div>
                            </li> */}
                            <li><a href="/">Giá vé</a></li>
                            <li><a href="/">Thành viên</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
export default Navbar;