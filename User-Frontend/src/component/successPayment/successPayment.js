import React from 'react';
import "./successPayment.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
var list = [];
var stt = [];
var strghe = "";
var tongtien = 0
class successPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ve: null,
      films: [],
      AnhBia: null
    }
  }

  setStateFilms = (data) => {
    this.setState({ ve: data})
  }

  UNSAFE_componentWillMount() {
    if(JSON.parse(sessionStorage.getItem('ve'))) {
      const ve = JSON.parse(sessionStorage.getItem('ve'));
      this.setStateFilms(ve)
      const tenfilm = {TenFilm: ve.TenFilm}
      axios.post('http://conallserver.ddns.net:8000/film/find', tenfilm)
      .then((res) => {
        if(!res.data.error) {
          this.setState({films: res.data.film, AnhBia: res.data.film[0].AnhBia})
        }
      })
    }
  }

  componentDidMount() {
    if(this.state.ve) {
      axios.post('http://conallserver.ddns.net:8000/ticket/createticket', this.state.ve)
          .then((res) => {
            if (!res.data.error) {
              const tongthu = {
                TenFilm: this.state.films[0].TenFilm,
                TongThu: this.state.ve.GiaVe + this.state.films[0].TongThu,
                DaoDien: this.state.films[0].DaoDien,
                TheLoai: this.state.films[0].TheLoai,
                TenNuocSX: this.state.films[0].TenNuocSX,
                TomTat: this.state.films[0].TomTat,
                TongChi: this.state.films[0].TongChi,
                NgayChieu: this.state.films[0].NgayChieu,
                NgayKetThuc: this.state.films[0].NgayKetThuc
              }
              axios.put('http://conallserver.ddns.net:8000/film/updatefilm', tongthu)
                .then((res1) => {
                  if (!res1.data.error) {
                  } else {
                    return window.alert(res1.data.error)
                  }
                });
            } else {
              if (res.data.error != 'ticket exist!') {
                return window.alert(res.data.error)
              }
            }
          });
    }
  }

  render() {
    if(this.state.ve) {
      let timechieu = this.state.ve.ThoiGianChieu.substring(11, this.state.ve.ThoiGianChieu.length - 5) + " "
      timechieu += this.state.ve.ThoiGianChieu.substring(8, this.state.ve.ThoiGianChieu.length - 14) + '/'
      timechieu += this.state.ve.ThoiGianChieu.substring(5, this.state.ve.ThoiGianChieu.length - 17) + '/'
      timechieu += this.state.ve.ThoiGianChieu.substring(0, this.state.ve.ThoiGianChieu.length - 20)
      return (
        <div className="container container-wrap-magin-top">
          <div className="row">
            <div className="col-md-3">
              <div htv-scroll-follow-content className="ticket-header aa">
                <section className="ticket-feature">
                  <article className="row">
                    <div style={{ textAlign: 'center' }} className="col-md-12">
                      <img src={"http://conallserver.ddns.net:8000/images/" + this.state.AnhBia} className="loading" data-was-processed="true" />
                    </div>
                    <div className="col-md-12">
                      <div className="ticket-detail">
                        <h2 className="ticket-title upper-text">{this.state.ve.TenFilm}</h2>
                        <div className="ticket-icon">
                          <span><i className="icon-c16" />
                            <span className="notice">(*) Phim chỉ dành cho khán giả từ 16 tuổi trở lên</span>
                          </span>
                        </div>
                        <div className="ticket-info">
                        <p><b>Rạp: &nbsp;</b>HTV Thủ đức&nbsp; | RAP {this.state.ve.TenPhong}&nbsp;</p>
                          <p><b>Suất chiếu: &nbsp;</b>{timechieu}</p>
                          <p className="  "><b>Combo: &nbsp;</b></p>
                          <p className="  "><b>Ghế: {this.state.ve.TenGhe}&nbsp;</b></p>
                        </div>
                        <div className="ticket-price-total">
                          <p>Tổng: &nbsp;
                            <htv-summary-ticket>
                              <span className="  ">{Number(this.state.ve.GiaVe).toLocaleString('en')} đồng</span>
                            </htv-summary-ticket></p>
                        </div>
                        <div className="ticket-price-total">
                          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <htv-summary-ticket>
                              <span className="  ">Đã mua thành công</span>
                            </htv-summary-ticket></p>
                        </div>
                        <div className="ticket-button">
                          <a className="btn primary-arrow primary-arrow-left" href='/'>Quay lại</a>
                        </div>
                      </div>
                    </div>
                  </article>
                </section>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container container-wrap-magin-top">
          <div className="row">
            <div className="col-md-3">
              <div htv-scroll-follow-content className="ticket-header aa">
                <section className="ticket-feature">
                  <article className="row">
                    Chua có vé
                  </article>
                </section>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
export default successPayment;
