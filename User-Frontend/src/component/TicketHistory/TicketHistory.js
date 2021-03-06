import React from 'react';
import axios from "axios";
var images = [];
class TicketHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ve: [],
      image: []
    }
    this.getVebyemail = this.getVebyemail.bind(this);
    // this.renderVe = this.renderVe.bind(this);
    this.getImageByFilmName = this.getImageByFilmName.bind(this);
  }

  componentDidMount() {
    this.getVebyemail();
  }

  getVebyemail = () => {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      const user = JSON.parse(localStorage.getItem('user'))
      const email = user["email"]
      const ve = {
        email: email,
        status: true
      }
      axios.post('http://localhost:8000/ticket/find', ve)
        .then((res) => {
          if (!res.data.error) {
            this.setState({ ve: res.data.ticket });
            for (let i in this.state.ve) {
              this.getImageByFilmName(this.state.ve[i]["TenFilm"]);
            }
          } else {
            if (res.data.error != "ticket don't exist!") {
              return window.alert(res.data.error)
            }
          }
        })
    }

  }

  getImageByFilmName = (tenfilm) => {
    var Tenfilm = {
      TenFilm: tenfilm
    }
    axios.post('http://localhost:8000/film/find', Tenfilm)
      .then((res) => {
        if (images.length === 0) {
          images.push(res.data.film[0]);
          this.setState({ image: images });
        } else {
          var exist = false;
          for (var i = 0; i < images.length; i++) {
            if (res.data.film[0]["TenFilm"] === images[i]["TenFilm"]) {
              exist = true;
            }
          }
          if (!exist) {
            images.push(res.data.film[0]);
            this.setState({ image: images });
          }
        }

      });
  }

  renderVe = () => {
    if (this.state.ve.length !== 0) {
      return this.state.ve.map((item, index) => {
        var tenghe = "";
        item['TenGhe'].forEach((ghe) => {
          if (ghe.substring(0, 1) != 'R') {
            tenghe += "VIP: " + ghe + ", ";
          } else {
            tenghe += "COUPLE: " + ghe + ", ";
          }
        });
        var thoigianchieu = item['ThoiGianChieu'].split('T')[1];
        var giodat = item['ThoiGianDat'].split('T')[1];
        var thoigiandat = giodat.substring(0, giodat.length - 5) + " " + item['ThoiGianDat'].split('T')[0];
        var gioxacnhan = item['ThoiGianXacNhan'].split('T')[1];
        var thoigianxacnhan = gioxacnhan.substring(0, gioxacnhan.length - 5) + " " + item['ThoiGianXacNhan'].split('T')[0];
        return (
          <div className="ticket-wrap" key={index}>
            <div className="ticket-center" >
              <div className="row">
                <div className="col-md-4" >
                  {this.state.image.map(items =>
                    (item["TenFilm"] === items["TenFilm"]) ?
                      <img style={{ width: 425, height: 317 }}
                        key={index + 100}
                        src={"http://localhost:8000/images/" + items["AnhBia"]} alt={items.TenFilm}
                        className="lazy loaded" />
                      :
                      null
                  )}

                </div>
                <div className="col-md-8" >
                  <div htv-scroll-follow-content className="ticket-header aa">
                    <section className="ticket-feature wrap-info-ticket">
                      <article className="row">
                        <div className="col-md-12">
                          <div className="ticket-detail">
                            <div className="ticket-info">
                              <p><b>Rạp: &nbsp;</b>RẠP HTV Thủ đức</p>
                              <p><b>id: &nbsp;</b>{item['_id']}</p>
                              <p><b>Phim &nbsp;</b>{item['TenFilm']}</p>
                              <p><b>Ngày chiếu: &nbsp;</b>{item['ThoiGianChieu'].split('T')[0]}</p>
                              <p><b>Thời gian chiếu: &nbsp;</b>{thoigianchieu.substring(0, thoigianchieu.length - 5)}</p>
                              <p><b>Phòng chiếu: &nbsp;</b>{item['TenPhong']}</p>
                              <p><b>Chỗ ngồi: &nbsp;</b>{tenghe.substring(0, tenghe.length - 2)}</p>
                              <p><b>Thời gian đặt vé: &nbsp;</b>{thoigiandat}</p>
                              <p><b>Thời gian xác nhận: </b>{thoigianxacnhan}</p>
                            </div>
                            <div className="ticket-price-total">
                              <p>
                                <htv-summary-ticket>
                                  <span>Giá vé:  {Number(item['GiaVe']).toLocaleString('en')} đồng</span>
                                </htv-summary-ticket></p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </section>
                  </div>
                </div>
              </div>
            </div>

            <div id="tour">
              <div className="ticket-btn">
                ------------------------------------------------------
                        </div>
            </div>
          </div>
        )
      });
    } else {
      return (
        <div className="container">
          <center> <h5>Bạn chưa mua vé nào!!!</h5></center>
          <div className="ticket-details" style={{ opacity: 1 }}></div>
        </div>
      )
    }
  }

  render() {
    const hStyle = { color: 'blue' };
    return (
      // <div className="container">
      //   <center><h2 className="font-header-ticket-history"><br />LỊCH SỬ ĐẶT VÉ</h2></center>
      //   {this.renderVe()}
      // </div>

      <div className="block-wrapper">
        <div className="container">
          <div className="row">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/updateinfouser">Thành viên</a>
              </li>
              <li className="breadcrumb-item active">Lịch sử đặt vé</li>
            </ol>
          </div>

          <div className="row">
            <div className="container">
              <center><h2 className="font-header-ticket-history">LỊCH SỬ ĐẶT VÉ</h2></center>
              {this.renderVe()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TicketHistory;
