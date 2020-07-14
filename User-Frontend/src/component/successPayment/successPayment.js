import React from 'react';
import axios from "axios";
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
    this.setState({ ve: data })
  }

  UNSAFE_componentWillMount() {
    if (JSON.parse(sessionStorage.getItem('ve'))) {
      const ve = JSON.parse(sessionStorage.getItem('ve'));
      this.setStateFilms(ve)
      const tenfilm = {TenFilm: ve.TenFilm}
      axios.post('http://htvcinemas.live:8000/film/find', tenfilm)
      .then((res) => {
        if(!res.data.error) {
          this.setState({films: res.data.film, AnhBia: res.data.film[0].AnhBia})
        }
      })
    }
  }

  componentDidMount() {
    if(this.state.ve.payed === false) {

      axios.post('http://htvcinemas.live:8000/ticket/createticket', this.state.ve)
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
              axios.put('http://htvcinemas.live:8000/film/updatefilm', tongthu)
                .then((res1) => {
                  if (!res1.data.error) {
                  } else {
                    return window.alert(res1.data.error)
                  }
                });
            } else {
              window.alert(res.data.error)
              return window.location = '/seat'
            }
          })
    }
  }

  render() {
    if (this.state.ve) {
      let timechieu = this.state.ve.ThoiGianChieu.substring(11, this.state.ve.ThoiGianChieu.length - 5) + " "
      timechieu += this.state.ve.ThoiGianChieu.substring(8, this.state.ve.ThoiGianChieu.length - 14) + '/'
      timechieu += this.state.ve.ThoiGianChieu.substring(5, this.state.ve.ThoiGianChieu.length - 17) + '/'
      timechieu += this.state.ve.ThoiGianChieu.substring(0, this.state.ve.ThoiGianChieu.length - 20)
      return (
        <div className="container container-wrap-magin-top">
          <div className="row">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Đặt vé</a>
              </li>
              <li className="breadcrumb-item active">Thanh toán</li>
            </ol>
          </div>
          <div className="row">
            <div className="container">
              <center>
                {
                  this.state.ve.payed === true ?
                    <h2 className="font-header-ticket-history header-successPayment">Thanh toán thành công</h2>
                  :
                  <div>
                    <h2 className="font-header-ticket-history header-successPayment">
                      Đặt vé thành công
                    </h2>
                    
                    <div className="row">
                      <div className="container">
                        <center>
                          <h4 className="font-note">
                            Lưu ý: Vui lòng thanh toán trước khi phim chiếu 15 phút
                          </h4>
                        </center>
                      </div>
                    </div>
                  </div>
                }
                
              </center>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
              <div htv-scroll-follow-content className="ticket-header aa">
                <section className="ticket-feature">
                  <article className="row">
                    <div style={{ textAlign: 'center' }} className="col-md-12">
                      <img src={"http://htvcinemas.live:8000/images/" + this.state.AnhBia} className="loading" data-was-processed="true" />
                    </div>
                    <div className="col-md-12">
                      <div className="ticket-detail">
                        <h2 className="ticket-title upper-text">{this.state.ve.TenFilm}</h2>
                        {/* <div className="ticket-icon">
                          <span><i className="icon-c16" />
                            <span className="notice">(*) Phim chỉ dành cho khán giả từ 16 tuổi trở lên</span>
                          </span>
                        </div> */}
                        <div className="ticket-info">
                          <p><b>Rạp: &nbsp;</b>HTV Thủ đức&nbsp; | RAP {this.state.ve.TenPhong}&nbsp;</p>
                          <p><b>Suất chiếu: &nbsp;</b>{timechieu}</p>
                          {/* <p><b>Combo: &nbsp;</b></p> */}
                          <p><b>Ghế: {this.state.ve.TenGhe}&nbsp;</b></p>
                        </div>
                        <div className="ticket-price-total">
                          <p>Tổng: &nbsp;
                            <htv-summary-ticket>
                              <span>{Number(this.state.ve.GiaVe).toLocaleString('en')} đồng</span>
                            </htv-summary-ticket></p>
                        </div>
                        <div className="ticket-price-total">
                          <p>
                            <htv-summary-ticket>
                              {
                                this.state.ve.payed === true ?
                                  <center><span>Đã thanh toán</span></center> 
                                :
                                  <center><span>Chưa thanh toán</span></center> 
                              }
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
            <div className="col-md-4">
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container container-wrap-magin-top">
        <div className="row">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Đặt vé</a>
            </li>
            <li className="breadcrumb-item active">Thanh toán</li>
          </ol>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div htv-scroll-follow-content className="ticket-header aa">
              <section className="ticket-feature">
                <article className="row">
                  <div className="col-md-12">
                    <div className="ticket-detail">
                      <div className="ticket-price-total chuacove-Payment">
                        <p>
                          <htv-summary-ticket>
                            <span><center>Chưa có vé</center></span>
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
          <div className="col-md-4"></div>
        </div>
      </div>
    )
  }
}
export default successPayment;
