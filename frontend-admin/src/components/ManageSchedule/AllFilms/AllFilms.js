import React, { Component } from 'react';
import Menu from '../../Menu/Menu';
import axios from "axios";
class AllFilms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            films: []
        };
    }

    componentDidMount() {

    }
    UNSAFE_componentWillMount() {
        this.isLocalStorage();
        axios.get("http://localhost:3001/film/allfilms")
            .then((res) => {
                this.setStateFilms(res.data);
            });
    }

    setStateFilms = (data) => {
        this.setState({ films: data });
    }

    isLocalStorage = () => {
        if (JSON.parse(sessionStorage.getItem('user')) != null) {
            var username = JSON.parse(sessionStorage.getItem('user'))["username"] ?
                JSON.parse(sessionStorage.getItem('user'))["username"] : null;
        }
        if(!username)
        return window.location = '/';
    }

    handleOnclickFilm = (tenphim) => {
        sessionStorage.setItem("tenphim", tenphim);
    }

    handleOnClickThemLich = (tenphim) => {
        sessionStorage.setItem("tenphim", tenphim);
        return window.location = '/addshedule';
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>All Films</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                                        <li className="breadcrumb-item active">AllFilms</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                            {this.state.films.map((item, index) =>
                                (index === 0) ?
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <button className="btn btn-success btn-sm float-right" onClick={this.handleOnClickThemLich.bind(this, item.TenFilm)}>
                                                    <i className="fas fa-add float-right"></i>Thêm lịch chiếu</button>
                                                <div>
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                                            <a href='/detailshedule' onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
                                                                <center><dt>{item.TenFilm}</dt></center>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <button className="btn btn-success btn-sm float-right" onClick={this.handleOnClickThemLich.bind(this, item.TenFilm)}>
                                                    <i className="fas fa-add float-right"></i>Thêm lịch chiếu</button>
                                                <div>
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                                            <a href='/detailshedule'  onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
                                                                <center><dt>{item.TenFilm}</dt></center>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            )}
                            </div>
                            <a id="back-to-top" href="#" className="btn btn-primary back-to-top" role="button" aria-label="Scroll to top">
                                <i className="fas fa-chevron-up" />
                            </a>
                            {/* /.content-wrapper */}
                        </div>

                    </section>
                </div>
            </div>
        );
    }

}

export default AllFilms;
