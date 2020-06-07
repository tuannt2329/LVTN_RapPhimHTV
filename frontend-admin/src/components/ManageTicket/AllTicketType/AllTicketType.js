import React, { Component } from 'react';
import Menu from '../../Menu/Menu';
import axios from "axios";
class AllTicketType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            films: []
        };
    }

    UNSAFE_componentWillMount() {
        this.isLocalStorage();
        axios.post("http://conallserver.ddns.net:8000/giave/find")
            .then((res) => {
                this.setStateFilms(res.data);
            });
    }

    setStateFilms = (data) => {
        this.setState({ films: data.loaive });
    }

    isLocalStorage = () => {
        if (JSON.parse(sessionStorage.getItem('user')) != null) {
            var username = JSON.parse(sessionStorage.getItem('user'))["firstName"] ?
                JSON.parse(sessionStorage.getItem('user'))["firstName"] : null;
        }
        if(!username)
            return window.location = '/';
    }

    handleOnclickFilm = (loaive) => {
        sessionStorage.setItem("loaive", loaive);
    }

    render() {
        console.log(this.state.films)
        return (
            <div>
                <Menu />
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>All Ticket Type</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                                        <li className="breadcrumb-item active">AllTicketType</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                            {this.state.films.map((item, index) =>
                                (index === 0) ?
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                                            <a href='/detailtickettype' onClick={this.handleOnclickFilm.bind(this, item.LoaiVe)}>
                                                                <center><dt>{item.LoaiVe}</dt></center>
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
                                                <div>
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                                            <a href='/detailtickettype'  onClick={this.handleOnclickFilm.bind(this, item.LoaiVe)}>
                                                                <center><dt>{item.LoaiVe}</dt></center>
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

export default AllTicketType;
