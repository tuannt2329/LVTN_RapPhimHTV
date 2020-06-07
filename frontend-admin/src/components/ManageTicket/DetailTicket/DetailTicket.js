import React, { Component } from 'react';
import axios from "axios";
import Menu from '../../Menu/Menu';
class DetailTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ve: null
    }
  }

  UNSAFE_componentWillMount() {
    const id = {_id: sessionStorage.getItem('id')};
    axios.post("http://conallserver.ddns.net:8000/ticket/find", id)
      .then((res) => {
        this.setStateFilms(res.data.ticket);
      });
  }

  setStateFilms = (ve) => {
    this.setState({ ve });
  }

  onSubmit = (e) => {
    if (window.confirm("Do you really want to submit?")) {
      e.preventDefault();

      var thoigianthuc = new Date();
      var thoigianxacthuc = thoigianthuc.getFullYear() + "-";
      if (thoigianthuc.getMonth() + 1 < 10) {
        thoigianxacthuc += "0";
      }
      thoigianxacthuc += (thoigianthuc.getMonth() + 1) + "-";
      if (thoigianthuc.getDate() < 10) {
        thoigianxacthuc += "0";
      }
      thoigianxacthuc += thoigianthuc.getDate() + "T";
      if (thoigianthuc.getHours() < 10) {
        thoigianxacthuc += "0";
      }
      thoigianxacthuc += thoigianthuc.getHours() + ":";
      if (thoigianthuc.getMinutes() < 10) {
        thoigianxacthuc += "0";
      }
      thoigianxacthuc += thoigianthuc.getMinutes() + ":";
      if (thoigianthuc.getSeconds() < 10) {
        thoigianxacthuc += "0";
      }
      thoigianxacthuc += thoigianthuc.getSeconds() + ".000Z";

      const ticket = {
        email: this.state.ve[0].email,
        TenFilm: this.state.ve[0].TenFilm,
        TenPhong: this.state.ve[0].TenPhong,
        TenGhe: this.state.ve[0].TenGhe,
        ThoiGianChieu: this.state.ve[0].ThoiGianChieu,
        ThoiGianXacNhan: thoigianxacthuc,
        NguoiXacNhan: JSON.parse(sessionStorage.getItem('user'))["email"]
      }
      axios.put('http://conallserver.ddns.net:8000/ticket/updateStatus', ticket)
      .then((res) => {
        if (!res.data.error) {
          window.alert("submit successful!");
          return window.location = "/alltickets";
        } else {
          return window.alert(res.data.error)
        }
      })
     
    }
  }

  render() {
    if(this.state.ve) {
      var tenghe = "";
        this.state.ve[0]['TenGhe'].forEach((ghe) => {
          if (ghe.substring(0, 1) != 'R') {
            tenghe += "VIP: " + ghe + ", ";
          } else {
            tenghe += "COUPLE: " + ghe + ", ";
          }
        });
        var thoigianchieu = this.state.ve[0]['ThoiGianChieu'].split('T')[1].substring(0, this.state.ve[0]['ThoiGianChieu'].split('T')[1].length - 5);
        var giodat = this.state.ve[0]['ThoiGianDat'].split('T')[1];
        var thoigiandat = giodat.substring(0, giodat.length - 5) + " " + this.state.ve[0]['ThoiGianDat'].split('T')[0];
       
      return (
        <div>
          <Menu />
          <div className="content-wrapper">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>Thông tin vé</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                      <li className="breadcrumb-item active">DetailTicket</li>
                    </ol>
                  </div>
                </div>
              </div>{/* /.container-fluid */}
            </section>
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-9 mx-auto d-block">
                    <div className="card">
                      <div className="card-header p-2">
                        <ul className="nav nav-pills">
                          <li className="nav-item">
                            <a className="nav-link" href="" data-toggle="tab">Thông tin vé</a>
                          </li>
                        </ul>
                      </div>{/* /.card-header */}
                        <div className="card-body">
                          <div className="tab-content">
                            <div className="active tab-pane" id="settings">
                              <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                              <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">email</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="email" defaultValue={this.state.ve[0].email} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">id phim</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="idfilm" placeholder="id phim" defaultValue={this.state.ve[0]._id} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Tên phim</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Tên phim" defaultValue={this.state.ve[0].TenFilm} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Ngày chiếu</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Ngày chiếu" defaultValue={this.state.ve[0]['ThoiGianChieu'].split('T')[0]} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Thời gian chiếu</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Thời gian chiếu" defaultValue={thoigianchieu} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Phòng chiếu</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Phòng chiếu" defaultValue={this.state.ve[0].TenPhong} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Chỗ ngồi</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Chỗ ngồi" defaultValue={tenghe.substring(0, tenghe.length - 2)} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Thời gian đặt vé</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Thời gian đặt vé" defaultValue={thoigiandat} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Giá vé</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Giá vé" defaultValue={Number(this.state.ve[0].GiaVe).toLocaleString('en') + ' đồng'} disabled/>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-12">
                                    <a href="/alltickets" className="btn btn-secondary">Cancel</a>
                                    <button type="submit" className="btn btn-success float-right">Submit</button>
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

export default DetailTicket;
