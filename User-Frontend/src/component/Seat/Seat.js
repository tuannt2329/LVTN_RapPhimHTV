import React from 'react';
import "./Seat.css";
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
class Seat extends React.Component {
  constructor(props) {
    super(props);
    this.setStateFilms = this.setStateFilms.bind(this)

    this.state = {
      films: [],
      counter: 0,
      TenFilm: null,
      LichChieu: [{
        NgayChieu: null,
        GioChieu: []
      }],
      NgayChieu: 'CHỌN NGÀY',
      GioChieu: 'CHỌN SUẤT CHIẾU',
      TenPhong: null,
      Ghe: [],
      choosing: [],
      TongTienVe: 0,
      paymentmethods: "payonline"
    }
    this.getGhebyPhong = this.getGhebyPhong.bind(this);
    this.updateStatusGhe = this.updateStatusGhe.bind(this)
  }

  setStateFilms = (data) => {
    this.setState({ films: data, counter: 1 })
  }

  UNSAFE_componentWillMount() {
    this.isLocalStorage();

    var TenFilm = { TenFilm: sessionStorage.getItem('tenphim') };

    axios.post("http://htvcinemas.live:8000/film/find", TenFilm)
      .then((res) => {
        this.setStateFilms(res.data.film)
      })
  }

  isLocalStorage = () => {
    if (sessionStorage.getItem('tenphim') != null) {
      var tenfilm = sessionStorage.getItem('tenphim') ?
        sessionStorage.getItem('tenphim') : null;
    }
    this.setState({ TenFilm: tenfilm });

  }
  componentDidMount() {
    this.getFilminLichChieu();
  }

  getFilminLichChieu = () => {
    var tenfilm = { TenFilm: this.state.TenFilm };
    var today = new Date()
    let date = today.getFullYear() + '-0' + (today.getMonth() + 1)
    if (today.getDate() < 10) {
      date += '-0' + today.getDate()
    } else {
      date += '-' + today.getDate()
    }
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + '.000Z'
    const datetime = date + 'T' + time
    axios.post('http://htvcinemas.live:8000/schedule/find', tenfilm)
      .then((res) => {
        if (!res.data.error) {
          for (const lc in res.data.schedule) {
            if (res.data.schedule[lc]["ThoiGianChieu"] >= datetime) {
              var lichchieu = (res.data.schedule[lc]["ThoiGianChieu"]).split("T");
              var i = 0;
              for (const n in list) {
                if (lichchieu[0] !== list[n].NgayChieu) {
                  i++;
                }
              }
              if (i === list.length) {
                list.push({ NgayChieu: lichchieu[0] });
              }
            }
          }
          for (const n in list) {
            var a = [];
            for (const lc1 in res.data.schedule) {
              var lichchieu1 = (res.data.schedule[lc1]["ThoiGianChieu"]).split("T");
              if (lichchieu1[0] === list[n].NgayChieu) {
                if (lichchieu1[0] === date && lichchieu1[1] < time) {
                  continue
                }
                a.push(lichchieu1[1]);
              }
            }

            list[n]["GioChieu"] = a;
          }
          console.log(list)
          list.sort(this.dynamicsort("NgayChieu"))
          for(let i = 0; i < list.length; i++) {
            list[i].GioChieu.sort()
          }
          this.setState({ LichChieu: list });
        }
      });
  }

  dynamicsort = (property) => {
    return function (a, b){
        // a should come before b in the sorted order
        if(a[property] < b[property]){
                return -1;
        // a should come after b in the sorted order
        }else if(a[property] > b[property]){
                return 1;
        // a and b are the same
        }else{
                return 0;
        }
    }
  }

  getGhebyPhong = (lichchieu) => {
    const tenphong = { TenPhong: this.state.TenPhong };
    axios.post('http://htvcinemas.live:8000/ghe/find', tenphong)
      .then((res) => {
        if (!res.data.error) {
          let tGhe = res.data.ghe
          tGhe.sort(this.dynamicsort("TenGhe"))
          this.setState({ Ghe: tGhe });
          this.updateStatusGhe(lichchieu)
        } else {
          return window.alert(res.data.error)
        }
      });
  }

  HandleClickNgay = (ngaychieu) => {
    stt = []
    strghe = ""
    tongtien = 0
    console.log("xx", ngaychieu)
    this.setState({ GioChieu: 'CHỌN SUẤT CHIẾU', Ghe: [], choosing: [], TongTienVe: 0 })
    this.setState({ NgayChieu: ngaychieu });
  }

  updateStatusGhe = (lichchieu) => {
    axios.post('http://htvcinemas.live:8000/ticket/find', lichchieu)
      .then((res) => {
        if (!res.data.error) {
          let ghedadat = []
          for (var t in res.data.ticket) {
            for (var r in res.data.ticket[t].TenGhe) {
              ghedadat.push(res.data.ticket[t].TenGhe[r])
            }
          }
          var gheghe = this.state.Ghe
          for (var i in gheghe) {
            for (var z in ghedadat) {
              if (gheghe[i].TenGhe === ghedadat[z]) {
                gheghe[i].status = true
              }
            }
          }
          this.setState({ Ghe: gheghe })
        } else {
          if (res.data.error !== 'ticket don\'t exist!') {
            return window.alert(res.data.error)
          }
        }
      })
  }

  HandleClickGio = (giochieu) => {
    stt = []
    strghe = ""
    tongtien = 0
    this.setState({ GioChieu: giochieu, choosing: [], TongTienVe: 0 });

    var lichchieu = {
      TenFilm: this.state.TenFilm,
      ThoiGianChieu: this.state.NgayChieu + "T" + giochieu
    }
    axios.post('http://htvcinemas.live:8000/schedule/find', lichchieu)
      .then((res) => {
        if (!res.data.error) {
          this.setState({ TenPhong: res.data.schedule[0]["TenPhong"] });
          if (localStorage.getItem('user') && this.state.choosing) {
            this.getGhebyPhong(lichchieu)
          } else {
            return window.alert("Bạn cần đăng nhập trước khi chọn ghế")
          }
        } else {
          return window.alert(res.data.error)
        }
      });
  }

  renderGhe = () => {
    let count = 0;
    if (this.state.choosing.length !== 0) {
    }
    var arr = [];
    this.state.Ghe.forEach((item, index) => {
      if (arr.length === 0) {
        arr.push(item["TenGhe"].slice(0, 1));
      }
      var a = false;
      arr.map((ghe) => {
        if (item["TenGhe"].slice(0, 1) === ghe) {
          a = true;
        }
        return null;
      })
      if (a === false && item["TenGhe"]) {
        arr.push(item["TenGhe"].slice(0, 1));
      }
    })
    return arr.map((ghe, ind) =>
      <tr key={ind}>
        <td className="road" colSpan={2}>{ghe}</td>
        {
          this.state.Ghe.map((item, index) => {
            var status = 'single ';
            if (item["TenGhe"].slice(0, 1) === ghe && ghe !== "R") {
              if (item["status"] === true) {
                status = 'busy';
              } else {
                for (var i = 0; i < this.state.choosing.length; i++) {
                  if (item["TenGhe"] === this.state.choosing[i]) {
                    status += "choosing";
                    break;
                  }
                }
              }
              return (
                <td className={status} key={index} onClick={this.handleGheOnclick.bind(this, item["TenGhe"], status)}>{item["TenGhe"]}</td>
              );
            } else {
              status = 'couple '
              if (item["TenGhe"].slice(0, 1) === ghe && ghe === "R") {
                if (item["status"] === true) {
                  status = 'busy-couple';
                } else {
                  for (var i = 0; i < this.state.choosing.length; i++) {
                    if (item["TenGhe"] === this.state.choosing[i]) {
                      status += "choosing";
                      break;
                    }
                  }
                }
                count++;
                if (count === 4) return (<td className="road" colSpan={3}></td>)
                return (
                  <td colSpan={2} className={status} key={index} onClick={this.handleGheOnclick.bind(this, item["TenGhe"], status)}>{item["TenGhe"]}</td>
                );
              }
            }
            return null;
          })
        }
        <td className="road" colSpan={2}>{ghe}</td>
      </tr>
    );
  }


  handleGheOnclick = (tenghe, status) => {
    if (status === 'single choosing' || status === 'couple choosing') {
      stt.splice(stt.indexOf(tenghe), 1);
    } else {
      if (status !== "busy" && status !== "busy-couple") {
        var exist = false;
        for (var i = 0; i < stt.length; i++) {
          if (stt[i] === tenghe) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          stt.push(tenghe);
        }
      }
    }
    this.setState({ choosing: stt });
    strghe = "";
    stt.forEach((item) => {
      strghe += (item + ', ');
    });
    if (status === 'single ' || status === "single choosing") {
      const ticketType = {
        LoaiVe: 'VIP'
      }
      axios.post('http://htvcinemas.live:8000/giave/find', ticketType)
        .then((res) => {
          if (!res.data.error) {
            if (status === 'single ') {
              tongtien += res.data.loaive[0]['GiaVe']
            } else {
              tongtien -= res.data.loaive[0]['GiaVe']
            }
            this.setState({ TongTienVe: tongtien })
          } else {
            return window.alert(res.data.error)
          }
        })
    } else {
      if (status === 'couple ' || status === "couple choosing") {
        const ticketType = {
          LoaiVe: 'COUPLE'
        }
        axios.post('http://htvcinemas.live:8000/giave/find', ticketType)
          .then((res) => {
            if (!res.data.error) {
              if (status === 'couple ') {
                tongtien += res.data.loaive[0]['GiaVe']
              } else {
                tongtien -= res.data.loaive[0]['GiaVe']
              }
              this.setState({ TongTienVe: tongtien })
            } else {
              return window.alert(res.data.error)
            }
          })
      }

    }

  }

  handleOnclickXacNhanDatVe = () => {
    if (window.confirm("bạn đã suy nghĩ kĩ?")) {
      if (localStorage.getItem('user') && this.state.choosing) {
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

        if (this.state.paymentmethods === "payonline") {
          let ve = {
            email: JSON.parse(localStorage.getItem('user'))['email'],
            TenFilm: this.state.TenFilm,
            TenPhong: this.state.TenPhong,
            TenGhe: this.state.choosing,
            ThoiGianChieu: this.state.NgayChieu + "T" + this.state.GioChieu,
            ThoiGianDat: thoigianxacthuc,
            GiaVe: this.state.TongTienVe,
            payed: true
          }
        
          sessionStorage.setItem('ve', JSON.stringify(ve))
          axios.post('http://htvcinemas.live:8000/paypal/pay', ve)
            .then((res) => {
              if (!res.data.error) {
                return window.location = res.data.result
              } else {
                return window.alert(res.data.error)
              }
            })
        } else {
          let ve = {
            email: JSON.parse(localStorage.getItem('user'))['email'],
            TenFilm: this.state.TenFilm,
            TenPhong: this.state.TenPhong,
            TenGhe: this.state.choosing,
            ThoiGianChieu: this.state.NgayChieu + "T" + this.state.GioChieu,
            ThoiGianDat: thoigianxacthuc,
            GiaVe: this.state.TongTienVe,
            payed: false
          }
          sessionStorage.setItem('ve', JSON.stringify(ve))
          return window.location = '/successpayment';
        }
      } else {
        return window.alert("Bạn cần đăng nhập trước khi đặt vé")
      }
    }
  }

  onChangePay = (e) => {
    this.setState({ paymentmethods: e.target.value })
  }

  render() {
    let thu = []
    if(this.state.LichChieu.NgayChieu) {
      for(let i = 0; i < this.state.LichChieu.length; i++) {
        let date = new Date(this.state.LichChieu[i].NgayChieu)
        if(date.getDay() + 1 === 1) {
          thu.push("Chủ nhật")
        } else {
          thu.push(date.getDay() + 1)  
        }
      }
    }
    
    return (
      <div className="container container-wrap-magin-top">
        <div className="row">
          <div className="col-md-9">
            <div className="ticket-wrapper">
              <div className="booking-bg">
                <div className="row">
                  <div className="col-md-12">
                    <section className="booking-ticket">
                      <h2 className="booking-title">Chọn ghế: &nbsp;<span className="select-seat" /></h2>
                      <div className="row padding-pickday">
                        <div className="lich-chieu-phim showtimes flex-viewport">
                          <h3 id="mua_ve">Lịch Chiếu</h3>
                          <div className="list--times ">
                            <div className="flexslider carousel">
                              <div className="flex-viewport" style={{ overflow: 'hidden', position: 'relative' }}>
                                <ul className="tab--showtimes-controls slides">
                                  {this.state.LichChieu.map((item, index) =>
                                  (thu[index]) ?
                                    (item.NgayChieu === this.state.NgayChieu) ?
                                      <li className="padding-time"
                                        style={{ width: '70px', marginRight: '0px', float: 'left', display: 'block' }}>
                                        <a id="showtime-tab-1" onClick={this.HandleClickNgay.bind(this, item.NgayChieu)}
                                          className="tab--control js__tab_time_control not_active added-transaction-id js__active">
                                          {
                                            (thu[index]) ?
                                              (thu[index] !== "Chủ nhật") ? 
                                              <span className="week">Thứ {thu[index]}</span>
                                              :
                                              <span className="week">{thu[index]}</span>
                                            : 
                                              null
                                          }
                                          <span className="day" value={item.NgayChieu}>{item.NgayChieu} </span>
                                        </a>
                                      </li>
                                      :
                                      <li className="padding-time"
                                        style={{ width: '70px', marginRight: '0px', float: 'left', display: 'block' }}>
                                        <a id="showtime-tab-1" onClick={this.HandleClickNgay.bind(this, item.NgayChieu)}
                                          className="tab--control js__tab_time_control not_active added-transaction-id">
                                          {
                                            (thu[index]) ?
                                              (thu[index] !== "Chủ nhật") ? 
                                                <span className="week">Thứ {thu[index]}</span>
                                              :
                                                <span className="week">{thu[index]}</span>
                                            : 
                                              null
                                          }
                                          <span className="day" value={item.NgayChieu}>{item.NgayChieu} </span>
                                        </a>
                                      </li>
                                    :
                                      <center>
                                          <a id="showtime-tab-1" className="tab--control js__tab_time_control not_active added-transaction-id">
                                            <span className="week">Hiện tại chưa có lịch chiếu</span>
                                          </a>
                                      </center>
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="loading-rap hide">
                              <span className="cssload-loader loading">
                                <span className="cssload-loader-inner" /></span>
                            </div>

                            <div className="tab--showtimes-contents">
                              <div className="tab--content js__tab_time_content conatiner-rap js__active">
                                <ul className="list--showtimes-cinema">
                                  <li className="item--showtimes-cinema date_2020-06-20 date_2020-06-21 hide-date"
                                    data-date="2020-06-20" style={{ display: 'list-item' }}>
                                    <div className="info">
                                      <div className="inside">
                                        <h4 className="title">HTV Thủ Đức</h4>
                                        <p>Trường Đại Học Sư Phạm Kỹ Thuật TP. Hồ Chí Minh Số 01, Võ Văn Ngân, Tỉnh Thủ Đức. </p>
                                      </div>
                                      <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+H%E1%BB%8Dc+S%C6%B0+Ph%E1%BA%A1m+K%E1%BB%B9+Thu%E1%BA%ADt+TP.+H%E1%BB%93+Ch%C3%AD+Minh/@10.8507786,106.7696897,17z/data=!3m1!4b1!4m5!3m4!1s0x3175270ad28d48ab:0xa6c02de0a7c40d6c!8m2!3d10.8507786!4d106.7718784?hl=vi-VN"
                                        target="_blank" className="btn--location added-transaction-id">
                                        <i className="fa fa-map-marker" />XEM VỊ TRÍ</a>
                                    </div>

                                    <div className="date_2020-06-20 hide-date" style={{ display: 'block' }}>
                                      <ul className="list--film-type">
                                        <li className="item--film-type">
                                          <ul className="times date_2020-06-20 hide-date" style={{ display: 'block' }}>
                                            {this.state.LichChieu.map((item, index) =>
                                              (item.NgayChieu === this.state.NgayChieu) ?
                                                item.GioChieu.map((gc) =>
                                                  (gc === this.state.GioChieu) ?
                                                    <li onClick={this.HandleClickGio.bind(this, gc)}  >
                                                      <a className="time added-transaction-id js__active_button"
                                                        value={gc}
                                                      >
                                                        {gc.substring(0, gc.length - 5)}
                                                      </a>
                                                    </li>
                                                    :
                                                    <li onClick={this.HandleClickGio.bind(this, gc)}  >
                                                      <a className="time added-transaction-id"
                                                        value={gc}
                                                      >
                                                        {gc.substring(0, gc.length - 5)}
                                                      </a>
                                                    </li>
                                                )
                                                : null
                                            )}
                                          </ul>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="seat-map-wrapper">
                        <div className="col-md-12">
                          <div className="cinema-wrap">
                            <div className="" />
                            <div className="screen">Màn hình</div>
                            <div className="cinema-seat" style={{ display: 'block' }}>
                              <div className="tbl-wrap">
                                <table>
                                  <tbody>
                                    {this.renderGhe()}

                                    <tr>
                                      <td />
                                      <td />
                                      <td colSpan={2} className="road" ></td>
                                      <td colSpan={2} className="road" ></td>
                                      <td colSpan={2} className="road" ></td>
                                      <td colSpan={2} className="road" ></td>
                                      <td className="road" ></td>
                                      <td colSpan={2} className="road" ></td>
                                      <td colSpan={2} className="road" ></td>
                                      <td colSpan={2} className="road" ></td>
                                      <td />
                                      <td />
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <ul className="cinema-note">
                              <li className="single">Ghế thường</li>
                              <li className="couple">Ghế đôi</li>
                              <li className="choosing">Ghế đang chọn</li>
                              <li className="busy">Ghế đã chọn</li>
                              <li className="road">Lối đi</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div htv-scroll-follow-content className="ticket-header aa">
              <section className="ticket-feature">
                {this.state.films.map((item, index) =>
                  ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))
                    || (Date.parse(item["NgayChieu"]) > Date.parse(Date()))) ?
                    <article className="row">
                      <div style={{ textAlign: 'center' }} className="col-md-12">
                        <img src={"http://htvcinemas.live:8000/images/" + item.AnhBia} className="loading" data-was-processed="true" />
                      </div>
                      <div className="col-md-12">
                        <div className="ticket-detail">
                          <h2 className="ticket-title upper-text">{item.TenFilm}</h2>
                          <div className="ticket-info">
                            <p><b>Rạp: &nbsp;</b>HTV Thủ đức&nbsp; | RAP {this.state.TenPhong}&nbsp;</p>
                            <p><b>Suất chiếu: &nbsp;</b>{this.state.GioChieu.substring(0, this.state.GioChieu.length - 5)}&nbsp; | {this.state.NgayChieu}</p>
                            <p className="  "><b>Combo: &nbsp;</b></p>
                            <p className="  "><b>Ghế: {strghe}&nbsp;</b></p>
                          </div>
                          <div className="ticket-price-total">
                            <p>Tổng: &nbsp;
                              <htv-summary-ticket>
                                <span className="  ">{Number(this.state.TongTienVe).toLocaleString('en')} đồng</span>
                              </htv-summary-ticket></p>
                          </div>

                          <div className="ticket-price-totalz">
                            <p>Chọn hình thức thanh toán</p>
                          </div>

                          <div className="require-col" onChange={this.onChangePay}>
                            <label className="gender">
                              <input type="radio"
                                name="gender"
                                title="Chọn hình thức thanh toán trực tuyến"
                                value="payonline" />
                              <span className="gender-name" >Trực tuyến</span>
                              <span className="gender-shape" />
                            </label>

                            <label className="gender input_taiquay" >
                              <input type="radio"
                                name="gender"
                                title="Chọn hình thức thanh toán tại quầy"
                                value="payoffline" />
                              <span className="gender-name">Tại quầy</span>
                              <span className="gender-shape" />
                            </label>
                          </div>

                          <div className="ticket-button">
                            <a className="btn primary-arrow primary-arrow-left" href='/detailfilm'>Quay lại</a>
                            <a onClick={this.handleOnclickXacNhanDatVe} className="btn primary-arrow primary-arrow-right right">
                              <i className="fa fa-pulse fa-spinner" />Tiếp tục</a>
                          </div>

                        </div>
                      </div>
                    </article>
                    :
                    null
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Seat;
