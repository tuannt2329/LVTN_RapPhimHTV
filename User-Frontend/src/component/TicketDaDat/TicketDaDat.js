import React from 'react';
import "./TicketHistory.css";
import axios from "axios";
var images = [];
class TicketDaDat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ve: [],
      image: []
    }
    this.getVebyemail = this.getVebyemail.bind(this);
    this.handleDeleteTicketExpired = this.handleDeleteTicketExpired.bind(this)
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
        status: false
      }
      axios.post('http://htvcinemas.live:8000/ticket/find', ve)
        .then((res) => {
          if (!res.data.error) {
            this.setState({ ve: res.data.ticket });
            this.handleDeleteTicketExpired()
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
    axios.post('http://htvcinemas.live:8000/film/find', Tenfilm)
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
        return (
          <div className="ticket-wrap" key={index}>
            <div className="ticket-center" >
              <div className="row">
                <div className="col-md-4" >
                  {this.state.image.map(items =>
                    (item["TenFilm"] === items["TenFilm"]) ?
                      <img style={{ width: 425, height: 330 }}
                        key={index}
                        src={"http://htvcinemas.live:8000/images/" + items["AnhBia"]}
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
                            </div>
                            <div className="ticket-price-total">
                              <p>
                                <htv-summary-ticket>
                                  <span>Giá vé:  {Number(item['GiaVe']).toLocaleString('en')} đồng</span>
                                </htv-summary-ticket></p>
                                {
                                  item['payed'] === true ? 
                                    <htv-summary-ticket>
                                      <span>Đã thanh toán</span> 
                                    </htv-summary-ticket>
                                  :
                                    <htv-summary-ticket>
                                      <span>Chưa thanh toán</span>
                                    </htv-summary-ticket>
                                }
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

  handleDeleteTicketExpired = async () => {
    var today = new Date()
    let date = today.getFullYear()
    if ((today.getMonth() + 1) < 10) {
      date += '-0' + (today.getMonth() + 1)
    } else {
      date += '-' + (today.getMonth() + 1)
    }
    if (today.getDate() < 10) {
      date += '-0' + today.getDate()
    } else {
      date += '-' + today.getDate()
    }
    let time = ''
    
    if((today.getMinutes() + 15) < 45) {
      if (today.getHours() < 10) {
        time += '0' + today.getHours()
      } else {
        time += today.getHours()
      }

      time += ':' + (today.getMinutes() + 15)
    } else {
      if (today.getHours() + 1 < 10) {
        time += '0' + (today.getHours() + 1)
      } else {
        time += (today.getHours() + 1)
      }
      if((today.getMinutes() - 45) < 10) {
        time += ':0' + (today.getMinutes() - 45)
      } else {
        time += ':' + (today.getMinutes() - 45)
      }
    }
    if (today.getSeconds() < 10) {
      time += ':0' + today.getSeconds()
    } else {
      time += ':' + today.getSeconds()
    }
    time += '.000Z'
    const datetime = date + 'T' + time

    if(this.state.ve.length != 0) {
      await this.state.ve.forEach( async (element, index) => {
        if(element.ThoiGianChieu <= datetime && element.payed === false) {
          const ticketdeleteparams = {
            TenFilm: element.TenFilm,
            ThoiGianChieu: datetime,
            TenPhong: element.TenPhong,
            ThoiGianChieu1: element.ThoiGianChieu
          }
          await axios.post('http://localhost:8000/ticket/deleteTicket', ticketdeleteparams)
            .then((res) => {
              if(!res.data.error) {
                let arrticket = this.state.ve
                arrticket.splice(index, 1);
                this.setState({ ve: arrticket})

                return("success")
              } else {
                window.alert(res.data.error)
                return ({error: res.data.error})
              }
            })
        }
      });
    }
    
  }

  render() {
    return (
      // <div className="container">
      // <center><h2 className="font-header-ticket-history"><br />VÉ ĐÃ ĐẶT</h2></center>
      // {this.renderVe()}
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
              <li className="breadcrumb-item active">Vé đã đặt</li>
            </ol>
          </div>

          <div className="row">
            <div className="container">
              <center><h2 className="font-header-ticket-history">VÉ ĐÃ ĐẶT</h2></center>
              <center><h4 className="font-note">Lưu ý: Những vé chưa thanh toán vui lòng thanh toán trước khi phim chiếu 15 phút </h4> </center>
              {this.renderVe()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TicketDaDat;
