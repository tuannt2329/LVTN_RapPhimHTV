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
        this.onChangeGioKetThuc = this.onChangeGioKetThuc.bind(this);
        this.onChangePhongChieu = this.onChangePhongChieu.bind(this);
    }

    UNSAFE_componentWillMount() {
        var TenFilm = {TenFilm: sessionStorage.getItem('tenphim')};
        
    }

    setStateFilms = (Film) => {
        this.setState({ Film });
    }

    onChangePhongChieu = (e) => {
        var film = this.state.Film;
        film["TenPhong"] = ""
        film["TenPhong"] = e.target.value;
        this.setState({
            Film: film
        });
    }

    onChangeNgayChieu = (e) => {
        var film = this.state.Film;
        film["ThoiGianChieu"] = ""
        film["ThoiGianKetThuc"] = ""
        film["ThoiGianChieu"] = e.target.value
        film["ThoiGianKetThuc"] = e.target.value
        this.setState({
            Film: film
        })
    }

    onChangeGioChieu = (e) => {
        var film = this.state.Film;
        try {
            const ngayChieu = (film["ThoiGianChieu"]).split("T")[0]
            film["ThoiGianChieu"] = ngayChieu
        } catch (error) {
            console.log(error)
        }
        film["ThoiGianChieu"] = this.state.Film["ThoiGianChieu"] + "T" + e.target.value + ":00.000Z";
        this.setState({
            Film: film
        });
    }

    onChangeGioKetThuc = (e) => {
        var film = this.state.Film;
        try {
            const ngayKetThuc = (film["ThoiGianKetThuc"]).split("T")[0]
            film["ThoiGianKetThuc"] = ngayKetThuc
        } catch (error) {
            console.log(error)
        }
        film["ThoiGianKetThuc"] = this.state.Film["ThoiGianKetThuc"] + "T" + e.target.value + ":00.000Z";
        this.setState({
            Film: film
        });

        
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if(this.state.Film["TenPhong"] && this.state.Film["ThoiGianChieu"] && this.state.Film["ThoiGianKetThuc"]) {
            if (this.state.Film["ThoiGianChieu"] < this.state.Film["ThoiGianKetThuc"]) {
                const schedule = {
                    TenPhong: this.state.Film.TenPhong
                }
                let count = 0
                await axios.post('http://localhost:8000/schedule/find', schedule)
                .then((res) => {
                    if (!res.data.error) {
                        res.data.schedule.map((item) => {
                            if(this.state.Film.ThoiGianChieu <= item.ThoiGianKetThuc && this.state.Film.ThoiGianChieu >= item.ThoiGianChieu) {
                                count++
                                
                            }
                        })
                    } else {
                        if(res.data.error != "schedule don't exist!") {
                            console.log(res.data.error)
                        }
                    }
                })
                if(count == 0 ) {
                    const film = this.state.Film;
                    axios.post('http://localhost:8000/schedule/createSchedule', film)
                    .then((res) => {
                        if (!res.data.error) {
                            window.alert("create schedule success!")
                            return window.location.reload()
                        } else {
                            return window.alert(res.data.error)
                        }
                    });
                } else {
                    window.alert("Phòng này đang chiếu phim khác")
                    return window.location.reload()
                }
                
            } else {
                return window.alert("Thoi Gian Chieu < Thoi Gian Ket Thuc")
            }
            
        } else {
            window.alert("please, input full information");
            return window.location.reload();
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

                                                                <div className="form-group row">
                                                                    <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Thời gian kết thúc</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="time" className="form-control" id="abc" onChange={this.onChangeGioKetThuc}/>
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
            <div><Menu /></div>
        );

    }
}

export default AddShedule;
