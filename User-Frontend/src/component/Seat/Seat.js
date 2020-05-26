import React from 'react';
import "./Seat.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
var list = [{}];
var GioChieu = [];
var stt = [];
var strghe = "";
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
      choosing: []
    }
    this.renderChonNgay = this.renderChonNgay.bind(this);
    this.getGhebyPhong = this.getGhebyPhong.bind(this);
  }

  setStateFilms = (data) => {
    console.log(data)
    this.setState({ films: data, counter: 1 })
  }

  UNSAFE_componentWillMount() {
    if (this.props.location.film) {
      sessionStorage.setItem("Film", JSON.stringify(this.props.location.film));
      window.location.reload();
    }
    this.isLocalStorage();

    var TenFilm = { TenFilm: sessionStorage.getItem('tenphim') };
    // axios.post("http://localhost:8000/film/find")
    //   .then((res) => {
    //     console.log(res.data);
    //     this.setStateFilms(res.data.film);
    //   })
    axios.post("http://localhost:8000/film/find", TenFilm)
      .then((res) => {
        this.setStateFilms(res.data.film)
      })
  }

  isLocalStorage = () => {
    if (JSON.parse(sessionStorage.getItem('Film')) != null) {
      var tenfilm = JSON.parse(sessionStorage.getItem('Film'))["TenFilm"] ?
        JSON.parse(sessionStorage.getItem('Film'))["TenFilm"] : null;
    }
    this.setState({ TenFilm: tenfilm });

  }
  // componentDidMount() {
  //   this.getFilminLichChieu();
  // }

  // getFilminLichChieu = () => {
  //   var tenfilm = { TenFilm: this.state.TenFilm };
  //   axios.post('http://localhost:8000/schedule/find', tenfilm)
  //     .then((res) => {
  //       if (res.data.length !== 0) {
  //         for (const lc in res.data) {
  //           var lichchieu = (res.data[lc]["ThoiGianChieu"]).split("T");
  //           var i = 0;
  //           for (const n in list) {
  //             if (lichchieu[0] !== list[n].NgayChieu) {
  //               i++;
  //             }
  //           }
  //           if (i === list.length) {
  //             list.push({ NgayChieu: lichchieu[0] });
  //           }
  //         }
  //         for (const n in list) {
  //           var a = [];
  //           for (const lc1 in res.data) {
  //             var lichchieu1 = (res.data[lc1]["ThoiGianChieu"]).split("T");
  //             if (lichchieu1[0] === list[n].NgayChieu) {
  //               a.push(lichchieu1[1]);
  //             }
  //           }
  //           list[n]["GioChieu"] = a;
  //         }
  //         list.splice(0, 1);
  //         this.setState({ LichChieu: list });
  //       }
  //     });
  // }

  getGhebyPhong = () => {
    const tenphong = { TenPhong: this.state.TenPhong };
    axios.post('http://localhost:8000/ghe/find', tenphong)
      .then((res) => {
        if (res.data) {
          this.setState({ Ghe: res.data });

        }
      });
  }

  HandleClickNgay = (ngaychieu) => {
    for (const i in this.state.LichChieu) {
      if (this.state.LichChieu[i].NgayChieu === ngaychieu) {
        GioChieu = this.state.LichChieu[i].GioChieu;
        this.setState({ NgayChieu: ngaychieu });
      }
    }
  }

  renderChonNgay = () => {
    return this.state.LichChieu.map((item, index) => {
      return (
        <button
          className="dropdown-item"
          onClick={this.HandleClickNgay.bind(this, item.NgayChieu)} key={index}
        >
          {item.NgayChieu}
        </button>
      )
    });
  }
  HandleClickGio = (giochieu) => {
    sessionStorage.setItem("LichChieu", JSON.stringify(this.state.NgayChieu + "T" + giochieu));
    this.setState({ GioChieu: giochieu });
    var lichchieu = {
      TenFilm: this.state.TenFilm,
      ThoiGianChieu: this.state.NgayChieu + "T" + giochieu
    }

    axios.post('http://localhost:8000/phong/find', lichchieu)
      .then((res) => {
        if (res.data) {
          this.setState({ TenPhong: res.data[0]["TenPhong"] });
          this.getGhebyPhong();
        }
      });
  }
  renderChonGioChieu = () => {
    return GioChieu.map((item, index) => {
      return (
        <button className="dropdown-item" key={index} onClick={this.HandleClickGio.bind(this, item)}>{item.substring(0, item.length - 5)} </button>
      );
    });
  }

  renderGhe = () => {
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
      if (a === false) {
        arr.push(item["TenGhe"].slice(0, 1));
      }
    })
    return arr.map((ghe, ind) =>
      <tr key={ind}>
        {
          this.state.Ghe.map((item, index) => {
            var status = 'single ';
            if (item["TenGhe"].slice(0, 1) === ghe) {
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
            }
            return null;
          })
        }
        <td className="road" colSpan={2}>{ghe}</td>
      </tr>
    );
  }


  handleGheOnclick = (tenghe, status) => {
    if (status === "single choosing") {
      stt.splice(stt.indexOf(tenghe), 1);
    } else {
      if (status !== "busy") {
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
  }

  handleOnclickXacNhanDatVe = () => {
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
      var ve = {
        email: JSON.parse(localStorage.getItem('user'))['email'],
        TenFilm: this.state.TenFilm,
        TenPhong: this.state.TenPhong,
        TenGhe: this.state.choosing,
        ThoiGianChieu: this.state.NgayChieu + "T" + this.state.GioChieu,
        ThoiGianDat: thoigianxacthuc
      }
      axios.post('http://localhost:8000/ticket/createticket', ve)
        .then((res) => {
          if (res.data['mess'] === "Them ve thanh cong!") {
            var ghes = [];
            this.state.choosing.forEach(item => {
              var a = {
                TenPhong: this.state.TenPhong,
                TenGhe: item,
                status: 'true'
              }
              ghes.push(a);
            });
            const tongthu = {
              TenFilm: this.state.TenFilm,
              TongThu: this.state.choosing.length
            }
            axios.put('http://localhost:8000/film/updatefilm', tongthu)
              .then((res) => {
                ghes.forEach(item => {
                  axios.put('http://localhost:8000/ghe/updateStatus', item)
                    .then((res) => {
                      if (res.data['mess'] === "update status success!") {
                        this.setState({ choosing: [] });
                        strghe = "";
                        stt = [];
                        return (
                          window.location = '/',
                          window.alert('Đặt vé thành công!')
                        )
                      }

                    });
                });
              });

          }
        });
    } else {
      return window.location = '/login';
    }
  }

  render() {
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
                      <div className="seat-map-wrapper">
                        <div className="col-md-4 col-sm-4 col-xs-12 col-xs-6 first-col">
                          <htv-select>
                            <div className="btn-select-sex login location">
                              <select id="sex"
                                value={this.state.gender}
                                onChange={this.onChangeGender}>
                                <option value="" disabled selected tabIndex="6">Chọn ngày chiếu</option>
                                <option value="male">1/1/1111</option>
                                <option value="female">2/2/2222</option>
                                <option value="other">3/3/3333</option>
                              </select>
                            </div>
                          </htv-select>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 second-col">
                          <htv-select>
                            <div className="btn-select-sex login location">
                              <select id="sex"
                                value={this.state.gender}
                                onChange={this.onChangeGender}>
                                <option value="" disabled selected tabIndex="6">Chọn suất chiếu</option>
                                <option value="male">1h</option>
                                <option value="female">2h</option>
                                <option value="other">3h</option>
                              </select>
                            </div>
                          </htv-select>
                        </div>

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
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108201997}>A01</td>
                                      <td className="single  " data-seat={1108202014}>A02</td>
                                      <td className="single  " data-seat={1108201997}>A01</td>
                                      <td className="single  " data-seat={1108202014}>A02</td>
                                      <td className="single  " data-seat={1108202031}>A03</td>
                                      <td className="single  " data-seat={1108202047}>A04</td>
                                      <td className="single  " data-seat={1108202063}>A05</td>
                                      <td className="single  " data-seat={1108202079}>A06</td>
                                      <td className="single  " data-seat={1108202094}>A07</td>
                                      <td className="single  " data-seat={1108202109}>A08</td>
                                      <td className="single  " data-seat={1108202124}>A09</td>
                                      <td className="single  " data-seat={1108202140}>A10</td>
                                      <td className="single  " data-seat={1108202157}>A11</td>
                                      <td className="single  " data-seat={1108202173}>A12</td>
                                      <td className="single  " data-seat={1108202190}>A13</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>
                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108201998}>B01</td>
                                      <td className="single  " data-seat={1108202015}>B02</td>
                                      <td className="single  " data-seat={1108201998}>B01</td>
                                      <td className="single  " data-seat={1108202015}>B02</td>
                                      <td className="single  " data-seat={1108202032}>B03</td>
                                      <td className="single  " data-seat={1108202048}>B04</td>
                                      <td className="single  " data-seat={1108202064}>B05</td>
                                      <td className="single  " data-seat={1108202080}>B06</td>
                                      <td className="single  " data-seat={1108202095}>B07</td>
                                      <td className="single  " data-seat={1108202110}>B08</td>
                                      <td className="single  " data-seat={1108202125}>B09</td>
                                      <td className="single  " data-seat={1108202141}>B10</td>
                                      <td className="single  " data-seat={1108202158}>B11</td>
                                      <td className="single  " data-seat={1108202174}>B12</td>
                                      <td className="single  " data-seat={1108202191}>B13</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>
                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108201998}>C01</td>
                                      <td className="single  " data-seat={1108202015}>B02</td>
                                      <td className="single  " data-seat={1108201999}>C01</td>
                                      <td className="single  " data-seat={1108202016}>C02</td>
                                      <td className="single  " data-seat={1108202033}>C03</td>
                                      <td className="single  " data-seat={1108202049}>C04</td>
                                      <td className="single  " data-seat={1108202065}>C05</td>
                                      <td className="single  " data-seat={1108202081}>C06</td>
                                      <td className="single  " data-seat={1108202096}>C07</td>
                                      <td className="single  " data-seat={1108202111}>C08</td>
                                      <td className="single  " data-seat={1108202126}>C09</td>
                                      <td className="single  " data-seat={1108202142}>C10</td>
                                      <td className="single  " data-seat={1108202159}>C11</td>
                                      <td className="single  " data-seat={1108202175}>C12</td>
                                      <td className="single  " data-seat={1108202192}>C13</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>
                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108202000}>D01</td>
                                      <td className="single  " data-seat={1108202017}>D02</td>
                                      <td className="single  " data-seat={1108202000}>D01</td>
                                      <td className="single  " data-seat={1108202017}>D02</td>
                                      <td className="single  " data-seat={1108202034}>D03</td>
                                      <td className="single  " data-seat={1108202050}>D04</td>
                                      <td className="single  " data-seat={1108202066}>D05</td>
                                      <td className="single  " data-seat={1108202082}>D06</td>
                                      <td className="single  " data-seat={1108202097}>D07</td>
                                      <td className="single  " data-seat={1108202112}>D08</td>
                                      <td className="single  " data-seat={1108202127}>D09</td>
                                      <td className="single  " data-seat={1108202143}>D10</td>
                                      <td className="single  " data-seat={1108202160}>D11</td>
                                      <td className="single  " data-seat={1108202176}>D12</td>
                                      <td className="single  " data-seat={1108202193}>D13</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>
                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108202001}>E01</td>
                                      <td className="single  " data-seat={1108202018}>E02</td>
                                      <td className="single  " data-seat={1108202001}>E01</td>
                                      <td className="single  " data-seat={1108202018}>E02</td>
                                      <td className="single  " data-seat={1108202035}>E03</td>
                                      <td className="single  " data-seat={1108202051}>E04</td>
                                      <td className="single  " data-seat={1108202067}>E05</td>
                                      <td className="single  " data-seat={1108202083}>E06</td>
                                      <td className="single  " data-seat={1108202098}>E07</td>
                                      <td className="single  " data-seat={1108202113}>E08</td>
                                      <td className="single  " data-seat={1108202128}>E09</td>
                                      <td className="single  " data-seat={1108202144}>E10</td>
                                      <td className="single  " data-seat={1108202161}>E11</td>
                                      <td className="single  " data-seat={1108202177}>E12</td>
                                      <td className="single  " data-seat={1108202194}>E13</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>
                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108202002}>F01</td>
                                      <td className="single  " data-seat={1108202019}>F02</td>
                                      <td className="single  " data-seat={1108202002}>F01</td>
                                      <td className="single  " data-seat={1108202019}>F02</td>
                                      <td className="single  " data-seat={1108202036}>F03</td>
                                      <td className="single  " data-seat={1108202052}>F04</td>
                                      <td className="single  " data-seat={1108202068}>F05</td>
                                      <td className="single  " data-seat={1108202084}>F06</td>
                                      <td className="single  " data-seat={1108202099}>F07</td>
                                      <td className="single  " data-seat={1108202114}>F08</td>
                                      <td className="single  " data-seat={1108202129}>F09</td>
                                      <td className="single  " data-seat={1108202145}>F10</td>
                                      <td className="single  " data-seat={1108202162}>F11</td>
                                      <td className="single  " data-seat={1108202178}>F12</td>
                                      <td className="single  " data-seat={1108202195}>F13</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>
                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108201970}>G01</td>
                                      <td className="single  " data-seat={1108201970}>G02</td>
                                      <td className="single  " data-seat={1108202003}>G03</td>
                                      <td className="single  " data-seat={1108202020}>G04</td>
                                      <td className="single  " data-seat={1108202037}>G05</td>
                                      <td className="single  " data-seat={1108202053}>G06</td>
                                      <td className="single  " data-seat={1108202069}>G07</td>
                                      <td className="single  " data-seat={1108202085}>G08</td>
                                      <td className="single busy " data-seat={1108202100}>G09</td>
                                      <td className="single busy " data-seat={1108202115}>G10</td>
                                      <td className="single  " data-seat={1108202130}>G11</td>
                                      <td className="single  " data-seat={1108202146}>G12</td>
                                      <td className="single  " data-seat={1108202163}>G13</td>
                                      <td className="single  " data-seat={1108202179}>G14</td>
                                      <td className="single  " data-seat={1108202196}>G15</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>
                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108201960}>H01</td>
                                      <td className="single  " data-seat={1108201971}>H02</td>
                                      <td className="single  " data-seat={1108202004}>H03</td>
                                      <td className="single  " data-seat={1108202021}>H04</td>
                                      <td className="single  " data-seat={1108202038}>H05</td>
                                      <td className="single  " data-seat={1108202054}>H06</td>
                                      <td className="single  " data-seat={1108202070}>H07</td>
                                      <td className="single  " data-seat={1108202086}>H08</td>
                                      <td className="single  " data-seat={1108202101}>H09</td>
                                      <td className="single  " data-seat={1108202116}>H10</td>
                                      <td className="single  " data-seat={1108202131}>H11</td>
                                      <td className="single  " data-seat={1108202147}>H12</td>
                                      <td className="single  " data-seat={1108202164}>H13</td>
                                      <td className="single  " data-seat={1108202180}>H14</td>
                                      <td className="single  " data-seat={1108202197}>H15</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>

                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108201964}>M01</td>
                                      <td className="single  " data-seat={1108201964}>M01</td>
                                      <td className="single  " data-seat={1108201975}>M02</td>
                                      <td className="single  " data-seat={1108202008}>M03</td>
                                      <td className="single  " data-seat={1108202025}>M04</td>
                                      <td className="single  " data-seat={1108202042}>M05</td>
                                      <td className="single  " data-seat={1108202058}>M06</td>
                                      <td className="single  " data-seat={1108202074}>M07</td>
                                      <td className="single  " data-seat={1108202090}>M08</td>
                                      <td className="single  " data-seat={1108202105}>M09</td>
                                      <td className="single  " data-seat={1108202120}>M10</td>
                                      <td className="single  " data-seat={1108202135}>M11</td>
                                      <td className="single  " data-seat={1108202151}>M12</td>
                                      <td className="single  " data-seat={1108202168}>M13</td>
                                      <td className="single  " data-seat={1108202184}>M14</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>
                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108201976}>N02</td>
                                      <td className="single  " data-seat={1108202009}>N03</td>
                                      <td className="single  " data-seat={1108202009}>N03</td>
                                      <td className="single  " data-seat={1108202026}>N04</td>
                                      <td className="single  " data-seat={1108202043}>N05</td>
                                      <td className="single  " data-seat={1108202059}>N06</td>
                                      <td className="single  " data-seat={1108202075}>N07</td>
                                      <td className="single  " data-seat={1108202091}>N08</td>
                                      <td className="single  " data-seat={1108202106}>N09</td>
                                      <td className="single  " data-seat={1108202121}>N10</td>
                                      <td className="single  " data-seat={1108202136}>N11</td>
                                      <td className="single  " data-seat={1108202152}>N12</td>
                                      <td className="single  " data-seat={1108202169}>N13</td>
                                      <td className="single  " data-seat={1108202185}>N14</td>
                                      <td className="single  " data-seat={1108202202}>N15</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>
                                    <tr>
                                      <td className="road" colSpan={2}>V</td>
                                      <td className="single  " data-seat={1108201966}>O01</td>
                                      <td className="single  " data-seat={1108201977}>O02</td>
                                      <td className="single  " data-seat={1108202010}>O03</td>
                                      <td className="single  " data-seat={1108202027}>O04</td>
                                      <td className="single  " data-seat={1108202044}>O05</td>
                                      <td className="single  " data-seat={1108202060}>O06</td>
                                      <td className="single  " data-seat={1108202076}>O07</td>
                                      <td className="single  " data-seat={1108202092}>O08</td>
                                      <td className="single  " data-seat={1108202107}>O09</td>
                                      <td className="single  " data-seat={1108202122}>O10</td>
                                      <td className="single  " data-seat={1108202137}>O11</td>
                                      <td className="single  " data-seat={1108202153}>O12</td>
                                      <td className="single  " data-seat={1108202170}>O13</td>
                                      <td className="single  " data-seat={1108202186}>O14</td>
                                      <td className="single  " data-seat={1108202203}>O15</td>
                                      <td className="road" colSpan={2}>V</td>
                                    </tr>

                                    <tr>
                                      <td />
                                      <td />
                                      <td colSpan={2} className="couple  " data-seat={1108201969}>R01</td>
                                      <td colSpan={2} className="couple  " data-seat={1108201996}>R02</td>
                                      <td colSpan={2} className="couple  " data-seat={1108202013}>R03</td>
                                      <td />
                                      <td />
                                      <td />
                                      <td colSpan={2} className="couple  " data-seat={1108202156}>R04</td>
                                      <td colSpan={2} className="couple  " data-seat={1108202189}>R05</td>
                                      <td colSpan={2} className="couple  " data-seat={1108202222}>R06</td>
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
                      <div className="total-mobile step2 hidden-lg">
                        <div className="ticket-price-total"><p>Ghế: &nbsp;
                            <span className="select-seat   " /></p>
                        </div>
                        <a
                          className="btn primary-arrow primary-arrow-right right">
                          <i className="fa fa-pulse fa-spinner" />Tiếp tục</a>
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
                        <img src={"http://localhost:8000/images/" + item.AnhBia} className="loading" data-was-processed="true" />
                      </div>
                      <div className="col-md-12">
                        <div className="ticket-detail">
                          <h2 className="ticket-title upper-text">{item.TenFilm}</h2>
                          <div className="ticket-icon">
                            <span><i className="icon-c16" />
                              <span className="notice">(*) Phim chỉ dành cho khán giả từ 16 tuổi trở lên</span>
                            </span>
                          </div>
                          <div className="ticket-info">
                            <p><b>Rạp: &nbsp;</b>HTV Thủ đức&nbsp; | RAP 5&nbsp;</p>
                            <p><b>Suất chiếu: &nbsp;</b>14:30&nbsp; | Thứ ba, 26/05/2020</p>
                            <p className="  "><b>Combo: &nbsp;</b></p>
                            <p className="  "><b>Ghế: &nbsp;</b></p>
                          </div>
                          <div className="ticket-price-total">
                            <p>Tổng: &nbsp;
                              <htv-summary-ticket>
                                <span className="  ">50,000 VNĐ</span>
                              </htv-summary-ticket></p>
                          </div>
                          <div className="ticket-button">
                            <a className="btn primary-arrow primary-arrow-left">Quay lại</a>
                            <a className="btn primary-arrow primary-arrow-right right">
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
