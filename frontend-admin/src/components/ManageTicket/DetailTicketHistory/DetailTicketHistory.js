import React, { Component } from 'react';
import axios from "axios";
import Menu from '../../Menu/Menu';
class DetailTicketHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ve: null
    }
  }

  UNSAFE_componentWillMount() {
    const id = {_id: sessionStorage.getItem('id')};
    axios.post("http://htvcinemas.live:8000/ticket/find", id)
      .then((res) => {
        this.setStateFilms(res.data.ticket);
      });
  }

  setStateFilms = (ve) => {
    this.setState({ ve });
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
       
        var ThoiGianXacNhan = this.state.ve[0]['ThoiGianXacNhan'].split('T')[1];
        var thoigianxacthuc = ThoiGianXacNhan.substring(0, ThoiGianXacNhan.length - 5) + " " + this.state.ve[0]['ThoiGianXacNhan'].split('T')[0];

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
                      <li className="breadcrumb-item active">DetailTicketHistory</li>
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
                              <form className="form-horizontal">
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
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Thời gian xác nhận</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Thời gian xác thực" defaultValue={thoigianxacthuc} disabled/>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="inputFilmName" className="col-sm-2 col-form-label">Người xác nhận</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputFilmName" placeholder="Người xác nhận" defaultValue={this.state.ve[0].NguoiXacNhan} disabled/>
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
                                    <a href="/ticketshistory" className="btn btn-secondary">Cancel</a>
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

export default DetailTicketHistory;
