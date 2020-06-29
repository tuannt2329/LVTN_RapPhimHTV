import React, { Component } from 'react';
import axios from "axios";
import Menu from '../../Menu/Menu';
class UpdateFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Film: null
        }
        this.onChangeDaoDien = this.onChangeDaoDien.bind(this);
        this.onChangeNuocSX = this.onChangeNuocSX.bind(this);
        this.onChangeTomTat = this.onChangeTomTat.bind(this);
        this.onChangeNgayChieu = this.onChangeNgayChieu.bind(this);
        this.onChangeNgayKetThuc = this.onChangeNgayKetThuc.bind(this);
        this.onChangeTongChi = this.onChangeTongChi.bind(this);
    }

    UNSAFE_componentWillMount() {
        var TenFilm = {TenFilm: sessionStorage.getItem('tenphim')};
        axios.post("http://localhost:8000/film/find", TenFilm)
            .then((res) => {
                this.setStateFilms(res.data.film[0]);
            });
    }

    setStateFilms = (Film) => {
        this.setState({ Film });
    }

    onChangeDaoDien = (e) => {
        var film = this.state.Film;
        film["DaoDien"] = e.target.value;
        this.setState({
            Film: film
        });
    }

    onChangeNuocSX = (e) => {
        var film = this.state.Film;
        film["TenNuocSX"] = e.target.value;
        this.setState({
            Film: film
        });
    }

    onChangeTomTat = (e) => {
        var film = this.state.Film;
        film["TomTat"] = e.target.value;
        this.setState({
            Film: film
        });
    }

    onChangeNgayChieu = (e) => {
        var film = this.state.Film;
        film["NgayChieu"] = e.target.value + "T00:00:00.000Z";
        this.setState({
            Film: film
        });
    }

    onChangeNgayKetThuc = (e) => {
        var film = this.state.Film;
        film["NgayKetThuc"] = e.target.value + "T00:00:00.000Z";
        this.setState({
            Film: film
        });
    }

    onChangeTongChi = (e) => {
        var film = this.state.Film;
        film["TongChi"] = e.target.value;
        this.setState({
            Film: film
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const film = this.state.Film;
        if(film.NgayChieu <= film.NgayKetThuc) {
            axios.put('http://localhost:8000/film/updatefilm', film)
            .then((res) => {
                if (!res.data.error) {
                    window.alert("update film success!")
                    return window.location.reload()
                } else {
                    return window.alert(res.data.error)
                }
            });
        } else {
            return window.alert("Ngay chieu must <= ngay ket thuc")
        }
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
                                        <h1>Update Film</h1>
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
                                                        <a className="nav-link" href="" data-toggle="tab">Thông tin phim</a>
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
                                                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Film Name" defaultValue={this.state.Film["TenFilm"]} disabled/>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Đạo diễn</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control" id="inputName" placeholder="Đạo diễn" defaultValue={this.state.Film["DaoDien"]} onChange={this.onChangeDaoDien}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label htmlFor="inputName2" className="col-sm-2 col-form-label">Nước sản xuất</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control" id="inputName2" placeholder="Nước sản xuất" defaultValue={this.state.Film["TenNuocSX"]} onChange={this.onChangeNuocSX}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Tóm tắt</label>
                                                                <div className="col-sm-10">
                                                                    <textarea className="form-control" id="inputExperience" placeholder="Tóm tắt" defaultValue={this.state.Film["TomTat"]} onChange={this.onChangeTomTat}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Ngày chiếu</label>
                                                                <div className="col-sm-10">
                                                                    <input type="date" className="form-control" id="inputExperience" defaultValue={(this.state.Film["NgayChieu"]) ? this.state.Film["NgayChieu"].split('T')[0] : null} onChange={this.onChangeNgayChieu}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Ngày kết thúc</label>
                                                                <div className="col-sm-10">
                                                                    <input type="date" className="form-control" id="inputExperience" defaultValue={(this.state.Film["NgayKetThuc"]) ? this.state.Film["NgayKetThuc"].split('T')[0] : null} onChange={this.onChangeNgayKetThuc}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Tổng chi phí</label>
                                                                <div className="col-sm-10">
                                                                    <input type="number" min="0" className="form-control" id="inputExperience" defaultValue={this.state.Film["TongChi"]} onChange={this.onChangeTongChi}/>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <a href="/allfilms" className="btn btn-secondary">Cancel</a>
                                                                    <button type="submit" className="btn btn-success float-right">Update</button>
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

export default UpdateFilm;
