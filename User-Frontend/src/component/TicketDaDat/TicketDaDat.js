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
          if(ghe.substring(0, 1) != 'R') {
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
                      <img key={index + 100} src={"http://localhost:8000/images/" + items["AnhBia"]} alt={items.TenFilm} style={{ width: 383, height: 315 }}></img>
                      :
                      null
                  )}

                </div>
                <div className="col-md-8" >
                  <div className="ticket-info" >
                    <h2>THÔNG TIN VÉ</h2>
                    <ul>
                      <div className="col-title">RẠP HTV THỦ ĐỨC</div> <br />
                      <div className="col-title">Phim:</div><div className="col-value">{item['TenFilm']}</div> <br />
                      <div className="col-title">Ngày chiếu:</div><div className="col-value">{item['ThoiGianChieu'].split('T')[0]}</div><br />
                      <div className="col-title">Thời gian chiếu:</div><div className="col-value">{thoigianchieu.substring(0, thoigianchieu.length - 5)}</div><br />
                      <div className="col-title">Phòng chiếu:</div><div className="col-value">{item['TenPhong']}</div><br />
                      <div className="col-title">Chỗ ngồi:</div><div className="col-value">{tenghe.substring(0, tenghe.length - 2)}</div><br />
                      <div className="col-title">Thời gian đặt vé:</div><div className="col-value">{thoigiandat}</div><br />
                      <div className="col-title">Giá vé:</div><div className="col-value">{Number(item['GiaVe']).toLocaleString('en')} đồng</div><br />
                    </ul>
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
    return (
      <div className="container">
        <center><h2 className="font-header-ticket-history"><br />VÉ ĐÃ ĐẶT</h2></center>
        {this.renderVe()}
      </div>
    );
  }
}
export default TicketDaDat;
