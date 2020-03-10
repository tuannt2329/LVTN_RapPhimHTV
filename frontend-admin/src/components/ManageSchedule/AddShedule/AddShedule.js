import React, { Component } from 'react';
import axios from "axios";
import Menu from '../../Menu/Menu';
class AddShedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Film: {
                TenFilm: sessionStorage.getItem("tenphim")
            }
        }
        this.onChangeGioChieu = this.onChangeGioChieu.bind(this);
        this.onChangePhongChieu = this.onChangePhongChieu.bind(this);
    }

    UNSAFE_componentWillMount() {
        var TenFilm = {TenFilm: sessionStorage.getItem('tenphim')};
        axios.post("http://localhost:3001/lichchieu/getlichbytenfilm", TenFilm)
            .then((res) => {
                // this.setStateFilms(res.data);
            });
    }

    setStateFilms = (Film) => {
        this.setState({ Film });
    }

    onChangePhongChieu = (e) => {
        var film = this.state.Film;
        film["TenPhong"] = e.target.value;
        this.setState({
            Film: film
        });
    }

    onChangeNgayChieu = (e) => {
        var film = this.state.Film;
        film["ThoiGianChieu"] = e.target.value;
        this.setState({
            Film: film
        });
    }

    onChangeGioChieu = (e) => {
        var film = this.state.Film;
        film["ThoiGianChieu"] = this.state.Film["ThoiGianChieu"] + "T" + e.target.value + ":00.000Z";
        this.setState({
            Film: film
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.Film["TenPhong"] && this.state.Film["ThoiGianChieu"]) {
            const film = this.state.Film;
            axios.post('http://localhost:3001/lichchieu/addlichchieu', film)
            .then((res) => {
                if(res.data["mess"] === "New schedule created!") {
                    window.alert("New schedule created!");
                    return window.location.reload();
                }
            });
        } else {
            window.alert("nhập đầy đủ thông tin");
            return window.location.reload();
        }
    }

    render() {
        console.log(this.state.Film);
        if(this.state.Film) {
            return (
                <div>
                    <Menu />
                    <div className="content-wrapper">
                        <section className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>Add Shedule</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                                            <li className="breadcrumb-item active">AddShedule</li>
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
                                                <div className="card-body">
                                                    <div className="tab-content">
                                                        <div className="active tab-pane" id="settings">
                                                            <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                                                                <div className="form-group row">
                                                                    <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Tên phim</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" id="inputFilmName" placeholder="Tên phim" defaultValue={this.state.Film["TenFilm"]} disabled/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Phòng chiếu</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" min="1" max="7" className="form-control" id="{index}a" placeholder="Phòng chiếu" onChange={this.onChangePhongChieu}/>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group row">
                                                                    <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Ngày chiếu</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="date" className="form-control" id="{index}" onChange={this.onChangeNgayChieu.bind(this)}/>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group row">
                                                                    <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Giờ chiếu</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="time" className="form-control" id="abc" onChange={this.onChangeGioChieu}/>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <a href="/allfilmsshedule" className="btn btn-secondary">Cancel</a>
                                                                        <button type="submit" className="btn btn-success float-right">Add</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
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

export default AddShedule;
