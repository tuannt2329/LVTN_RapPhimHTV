import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from "axios";

class FilmByCountry extends React.Component {
    constructor(props) {
        super(props)
        //console.log('from ', this.props.match.params.id)
        this.setStateFilms = this.setStateFilms.bind(this)
        this.state = {
            films: [],
            show: false,
            counter: 0
        }
    }

    setStateFilms = async (data) => {
        await this.setState({ films: data.film })
        await this.setState({ show: true })
    }

    UNSAFE_componentWillMount() {
        let TenNuocSX = { TenNuocSX: this.props.match.params.id.slice(1, this.props.match.params.id.length) };
        axios.post("http://htvcinemas.live:8000/film/find", TenNuocSX)
            .then(async (res) => {
                await console.log('aaaaaaaa', res.data)
                await this.setStateFilms(res.data);
            })
    }

    handleOnclickFilm = (tenphim) => {
        sessionStorage.setItem("tenphim", tenphim);
    }

    // static getDerivedStateFromProps(nextProps, prevState){
    //     if(nextProps.match.params.id !== prevState.match.params.id){
    //       return { productID: nextProps.productID};
    //    } 
    //    else {
    //       return null;
    //    }
    //  }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let TenNuocSX = { TenNuocSX: this.props.match.params.id.slice(1, this.props.match.params.id.length) };
            axios.post("http://htvcinemas.live:8000/film/find", TenNuocSX)
                .then(async (res) => {
                    await this.setStateFilms(res.data);
                })
        }
    }

    render() {
        let counter = 0;
        let counter2 = 0;
        if (this.state.show === true) {
            this.state.films.map((item, index) => {
                if ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))) {
                    counter++
                }
                if (Date.parse(item["NgayChieu"]) > Date.parse(Date())) {
                    counter2++
                }
            })
        }

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
                                                {
                                                    counter !== 0 ?
                                                        this.state.films.map((item, index) =>
                                                            ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))) ?
                                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                                    <div className="article-movie-home">
                                                                        <img style={{ height: 264 }}
                                                                            key={index}
                                                                            src={"http://htvcinemas.live:8000/images/" + item.AnhBia}
                                                                            className="lazy loaded" />
                                                                        <Link to="/detailfilm" onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
                                                                            <div className="decription-hover overlay">
                                                                                <div className="movies-content">
                                                                                    <div className="group">
                                                                                        <div className="btn secondary-white">mua vé</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="title-movie">
                                                                        <h4 className="upper-text">{item.TenFilm}</h4>
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                        )
                                                        :
                                                        <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                            <div className="title-movie">
                                                                <h4 className="upper-text">Không có phim đang chiếu</h4>
                                                            </div><div className="article-movie-home">
                                                                <img style={{ height: 264 }}
                                                                    className="lazy loaded" />
                                                            </div>
                                                        </div>
                                                }
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
                                                {
                                                    counter2 !== 0 ?
                                                        this.state.films.map((item, index) =>
                                                            (Date.parse(item["NgayChieu"]) > Date.parse(Date())) ?
                                                                <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                                    <div className="article-movie-home">
                                                                        <img style={{ height: 264 }}
                                                                            key={index}
                                                                            src={"http://htvcinemas.live:8000/images/" + item.AnhBia}
                                                                            className="lazy loaded" />
                                                                        <Link to="/detailfilm" onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
                                                                            <div className="decription-hover overlay">
                                                                                <div className="movies-content">
                                                                                    <div className="group">
                                                                                        <div className="btn secondary-white">mua vé</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="title-movie">
                                                                        <h4 className="upper-text">{item.TenFilm}</h4>
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                        )
                                                        :
                                                        <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                                                            <div className="title-movie">
                                                                <h4 className="upper-text">Không có phim sắp chiếu</h4>
                                                            </div><div className="article-movie-home">
                                                                <img style={{ height: 264 }}
                                                                    className="lazy loaded" />
                                                            </div>
                                                        </div>
                                                }
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
export default FilmByCountry;