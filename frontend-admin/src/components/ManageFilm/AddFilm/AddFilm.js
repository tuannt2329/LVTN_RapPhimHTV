import React, { Component } from 'react';
import Menu from '../../Menu/Menu';
import axios from "axios";
class AddFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Film: {
                TenFilm: null,
                DaoDien: null,
                TheLoai: null,
                TenNuocSX: null,
                TomTat: null,
                NgayChieu: null,
                NgayKetThuc: null,
                TongChi: null,
                AnhBia: null
            }
        }
        this.onChangeTenFilm = this.onChangeTenFilm.bind(this);
        this.onChangeTheLoai = this.onChangeTheLoai.bind(this);
        this.onChangeDaoDien = this.onChangeDaoDien.bind(this);
        this.onChangeNuocSX = this.onChangeNuocSX.bind(this);
        this.onChangeTomTat = this.onChangeTomTat.bind(this);
        this.onChangeNgayChieu = this.onChangeNgayChieu.bind(this);
        this.onChangeNgayKetThuc = this.onChangeNgayKetThuc.bind(this);
        this.onChangeTongChi = this.onChangeTongChi.bind(this);
        this.onChangeAnhBia = this.onChangeAnhBia.bind(this);
    }

    onChangeTenFilm = (e) => {
        var film = this.state.Film;
        film["TenFilm"] = e.target.value;
        this.setState({
            Film: film
        });
    }

    onChangeTheLoai = (e) => {
        var film = this.state.Film;
        film["TheLoai"] = e.target.value;
        this.setState({
            Film: film
        });
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

    onChangeAnhBia = (e) => {
        var film = this.state.Film;
        film["AnhBia"] = e.target.files[0];
        this.setState({
            Film: film
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(document);
        const fd = new FormData();
        fd.append('AnhBia', this.state.Film.AnhBia);
        fd.append('TenFilm', this.state.Film.TenFilm);
        fd.append('TheLoai', this.state.Film.TheLoai);
        fd.append('DaoDien', this.state.Film.DaoDien);
        fd.append('TenNuocSX', this.state.Film.TenNuocSX);
        fd.append('TomTat', this.state.Film.TomTat);
        fd.append('NgayChieu', this.state.Film.NgayChieu);
        fd.append('NgayKetThuc', this.state.Film.NgayKetThuc);
        fd.append('TongChi', this.state.Film.TongChi);
        const film = this.state.Film;
        if(film.NgayChieu <= film.NgayKetThuc) {
            axios.post('http://conallserver.ddns.net:8000/film/createfilm', fd)
            .then((res) => {
                if (!res.data.error) {
                    window.alert("create film success!")
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
        console.log(this.state.Film);
        return (
            <div>
                <Menu />
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Thêm phim mới</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                                        <li className="breadcrumb-item active">AddFilm</li>
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
                                                    <a className="nav-link" href="#settings" data-toggle="tab">Thông tin phim</a>
                                                </li>
                                            </ul>
                                        </div>{/* /.card-header */}
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="active tab-pane" id="settings">
                                                    <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)} enctype="multipart/form-data">
                                                        <div className="form-group row">
                                                            <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Tên phim</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputFilmName" placeholder="Tên phim" onChange={this.onChangeTenFilm}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Thể loại</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputTL" placeholder="Thể loại" onChange={this.onChangeTheLoai}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Đạo diễn</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputName" placeholder="Đạo diễn" onChange={this.onChangeDaoDien}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Nước sản xuất</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputName2" placeholder="nước sản xuất" onChange={this.onChangeNuocSX}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Tóm tắt</label>
                                                            <div className="col-sm-10">
                                                                <textarea className="form-control" id="inputExperience" placeholder="Summary" defaultValue={""} onChange={this.onChangeTomTat} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Ngày Chiếu</label>
                                                            <div className="col-sm-10">
                                                                <input type="date" className="form-control" id="inputName2" onChange={this.onChangeNgayChieu}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Ngày kết thúc</label>
                                                            <div className="col-sm-10">
                                                                <input type="date" className="form-control" id="inputName2" onChange={this.onChangeNgayKetThuc}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Tổng chi phí</label>
                                                            <div className="col-sm-10">
                                                                <input type="number" min="0" className="form-control" id="inputName2" placeholder="Tổng chi phí" onChange={this.onChangeTongChi}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Thêm ảnh bìa</label>
                                                            <div className="col-sm-10">
                                                                <div className="custom-file">
                                                                    <input type="file" className="custom-file-input" id="exampleInputFile" onChange={this.onChangeAnhBia}/>
                                                                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-12">
                                                                <a href="/allfilms" className="btn btn-secondary">Cancel</a>
                                                                <button type="submit" className="btn btn-success float-right">Thêm</button>
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

}

export default AddFilm;
