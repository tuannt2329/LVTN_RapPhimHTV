import React, { Component } from 'react';
import axios from "axios";
import Menu from '../../Menu/Menu';
class DetailShedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Film: null
        }
        this.onChangeGioChieu = this.onChangeGioChieu.bind(this);
        this.onChangePhongChieu = this.onChangePhongChieu.bind(this);
    }

    UNSAFE_componentWillMount() {
        var TenFilm = {TenFilm: sessionStorage.getItem('tenphim')};
        axios.post("http://localhost:3001/lichchieu/getlichbytenfilm", TenFilm)
            .then((res) => {
                this.setStateFilms(res.data);
            });
    }

    setStateFilms = (Film) => {
        this.setState({ Film });
    }

    onChangePhongChieu = (e) => {
        var film = this.state.Film;
        film[e.target.id]["TenPhong"] = e.target.value;
        this.setState({
            Film: film
        });
    }

    onChangeNgayChieu = (e) => {
        var film = this.state.Film;
        film[e.target.id]["ThoiGianChieu"] = e.target.value + "T" + this.state.Film[e.target.id]["ThoiGianChieu"].split("T")[1];
        this.setState({
            Film: film
        });
    }

    onChangeGioChieu = (e) => {
        var film = this.state.Film;
        film[e.target.id]["ThoiGianChieu"] = this.state.Film[e.target.id]["ThoiGianChieu"].split("T")[0] + "T" + e.target.value + ":00.000Z";
        this.setState({
            Film: film
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var count = 0;
        console.log(this.state.Film[0]["_id"]);
        this.state.Film.map((item) => {
            const film = item;
            axios.put('http://localhost:3001/lichchieu/update', film)
            .then((res) => {
                if(res.data["message"] === "update shedule success!") {
                    count++;
                }
            });
        });
        if(count === this.state.Film.length) {
            window.alert("update shedule success!");
            return window.location.reload();
        }
    }

    handleOnclickDelete = (film) => {
        var film = film;
        axios.put("http://localhost:3001/lichchieu/delete", film)
            .then((res) => {
                if(res.data["mess"] === "delete shedule success!") {
                    axios.put("http://localhost:3001/ghe/updatestatusbyTenPhong", film)
                    .then((res1) => {
                        if(res1.data["mess"] === "update status success!") {
                            axios.post("http://localhost:3001/ve/delete", film)
                            .then((res2) => {
                                if(res2.data["mess"] === "delete success!")
                                    window.location.reload();
                            });
                        }
                    });
                }
            });
    }

    render() {
        if(this.state.Film) {
            return (
                <div>
                    <Menu />
                    <div className="content-wrapper">
                        <section className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>Update Shedule</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                                            <li className="breadcrumb-item active">UpdateFilm</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>{/* /.container-fluid */}
                        </section>
                        {/* Main content */}
                        <section className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-9 mx-auto d-block">
                                        <div className="card">
                                            <div className="card-header p-2">
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="" data-toggle="tab">Thông tin lịch chiếu</a>
                                                    </li>
                                                </ul>
                                            </div>{/* /.card-header */}
                                            {this.state.Film.map((item, index) => 
                                                <div className="card-body">
                                                    <div className="tab-content">
                                                        <div className="active tab-pane" id="settings">
                                                            <button className="btn btn-danger float-right" onClick={this.handleOnclickDelete.bind(this, item)}>
                                                                <i className="fas fa-trash float-right"></i>Delete</button>
                                                            <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                                                                <div className="form-group row">
                                                                    <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Tên phim</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" id="inputFilmName" placeholder="Tên phim" defaultValue={item["TenFilm"]} disabled/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Phòng chiếu</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" min="1" max="7" className="form-control" id={index} placeholder="Phòng chiếu" defaultValue={item["TenPhong"]} onChange={this.onChangePhongChieu}/>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group row">
                                                                    <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Ngày chiếu</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="date" className="form-control" id={index} defaultValue={(item["ThoiGianChieu"]) ? item["ThoiGianChieu"].split('T')[0] : null} onChange={this.onChangeNgayChieu.bind(this)}/>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group row">
                                                                    <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Giờ chiếu</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="time" className="form-control" id={index} defaultValue={(item["ThoiGianChieu"]) ? item["ThoiGianChieu"].split("T")[1].split(":00.")[0] : null} onChange={this.onChangeGioChieu}/>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <a href="/allfilmsshedule" className="btn btn-secondary">Cancel</a>
                                                                        <button type="submit" className="btn btn-success float-right">Update</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            );
        }
        return (
            <div></div>
        );

    }
}

export default DetailShedule;
