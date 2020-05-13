import React from 'react';
import "./Seat.css";
import axios from "axios";
import { Link } from 'react-router-dom';
var list = [{}];
var GioChieu = [];
var stt = [];
var strghe = "";
class Seat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  UNSAFE_componentWillMount() {
    if (this.props.location.film) {
      sessionStorage.setItem("Film", JSON.stringify(this.props.location.film));
      window.location.reload();
    }
    this.isLocalStorage();
  }

  isLocalStorage = () => {
    if (JSON.parse(sessionStorage.getItem('Film')) != null) {
      var tenfilm = JSON.parse(sessionStorage.getItem('Film'))["TenFilm"] ?
        JSON.parse(sessionStorage.getItem('Film'))["TenFilm"] : null;
    }
    this.setState({ TenFilm: tenfilm });

  }
  componentDidMount() {
    this.getFilminLichChieu();
  }

  getFilminLichChieu = () => {
    var tenfilm = { TenFilm: this.state.TenFilm };
    axios.post('http://localhost:3001/lichchieu/getlichbytenfilm', tenfilm)
      .then((res) => {
        if (res.data.length !== 0) {
          for (const lc in res.data) {
            var lichchieu = (res.data[lc]["ThoiGianChieu"]).split("T");
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
          for (const n in list) {
            var a = [];
            for (const lc1 in res.data) {
              var lichchieu1 = (res.data[lc1]["ThoiGianChieu"]).split("T");
              if (lichchieu1[0] === list[n].NgayChieu) {
                a.push(lichchieu1[1]);
              }
            }
            list[n]["GioChieu"] = a;
          }
          list.splice(0, 1);
          this.setState({ LichChieu: list });
        }
      });
  }

  getGhebyPhong = () => {
    const tenphong = { TenPhong: this.state.TenPhong };
    axios.post('http://localhost:3001/ghe/getGhebyPhong', tenphong)
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

    axios.post('http://localhost:3001/lichchieu/getphongbygiochieu', lichchieu)
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
      axios.post('http://localhost:3001/ve/addve', ve)
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
            axios.put('http://localhost:3001/film/updateTongThu', tongthu)
              .then((res) => {
                ghes.forEach(item => {
                  axios.put('http://localhost:3001/ghe/updatestatus', item)
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
      <div className="block-wrapper-seat">
        <div className="container">
          {/* <h2 style={{ color: 'blue' }}>Phim: {this.state.TenFilm}</h2> */}
          {/* <div className="btn-group" style={{ marginTop: '8px' }}>
            <div className="dropdown">
              <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" >
                {this.state.NgayChieu}</button>&nbsp;
                <div className="dropdown-menu">
                {this.renderChonNgay()}
              </div>
            </div>
          </div>
          <div className="btn-group" style={{ marginTop: '8px' }}>
            <div className="dropdown">
              <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" >
                {this.state.GioChieu.substring(0, this.state.GioChieu.length - 5)}</button>&nbsp;
                  <div className="dropdown-menu">
                {this.renderChonGioChieu()}
              </div>
            </div>
          </div> */}

          <div className="cinema-wrap">
            <div className="cinema-wrap-background" />
            <h1 className="cinema-title">Màn hình</h1>
            <div className="cinema-seat" style={{ display: 'block' }}>
              <div className="tbl-wrap">
                <table>
                  <tbody>
                    <tr><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /><td /></tr>
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
                      <td className="single  " data-seat={1108202206}>A14</td>
                      <td className="single  " data-seat={1108202223}>A15</td>
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
                      <td className="single  " data-seat={1108202207}>B14</td>
                      <td className="single  " data-seat={1108202224}>B15</td>
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
                      <td className="single  " data-seat={1108202208}>C14</td>
                      <td className="single  " data-seat={1108202225}>C15</td>
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
                      <td className="single  " data-seat={1108202209}>D14</td>
                      <td className="single  " data-seat={1108202226}>D15</td>
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
                      <td className="single  " data-seat={1108202210}>E14</td>
                      <td className="single  " data-seat={1108202227}>E15</td>
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
                      <td className="single  " data-seat={1108202211}>F14</td>
                      <td className="single  " data-seat={1108202228}>F15</td>
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
                      <td className="single  " data-seat={1108202212}>G16</td>
                      <td className="single  " data-seat={1108202229}>G17</td>
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
                      <td className="single  " data-seat={1108202213}>H16</td>
                      <td className="single  " data-seat={1108202230}>H17</td>
                      <td className="road" colSpan={2}>V</td>
                    </tr>
                    <tr>
                      <td className="road" colSpan={2}>V</td>
                      <td className="single  " data-seat={1108201961}>J01</td>
                      <td className="single  " data-seat={1108201972}>J02</td>
                      <td className="single  " data-seat={1108202005}>J03</td>
                      <td className="single  " data-seat={1108202022}>J04</td>
                      <td className="single  " data-seat={1108202039}>J05</td>
                      <td className="single  " data-seat={1108202055}>J06</td>
                      <td className="single  " data-seat={1108202071}>J07</td>
                      <td className="single  " data-seat={1108202087}>J08</td>
                      <td className="single  " data-seat={1108202102}>J09</td>
                      <td className="single  " data-seat={1108202117}>J10</td>
                      <td className="single  " data-seat={1108202132}>J11</td>
                      <td className="single  " data-seat={1108202148}>J12</td>
                      <td className="single  " data-seat={1108202165}>J13</td>
                      <td className="single  " data-seat={1108202181}>J14</td>
                      <td className="single  " data-seat={1108202198}>J15</td>
                      <td className="single  " data-seat={1108202214}>J16</td>
                      <td className="single  " data-seat={1108202231}>J17</td>
                      <td className="road" colSpan={2}>V</td>
                    </tr>
                    <tr>
                      <td className="road" colSpan={2}>V</td>
                      <td className="single  " data-seat={1108201962}>K01</td>
                      <td className="single  " data-seat={1108201973}>K02</td>
                      <td className="single  " data-seat={1108202006}>K03</td>
                      <td className="single  " data-seat={1108202023}>K04</td>
                      <td className="single  " data-seat={1108202040}>K05</td>
                      <td className="single  " data-seat={1108202056}>K06</td>
                      <td className="single  " data-seat={1108202072}>K07</td>
                      <td className="single  " data-seat={1108202088}>K08</td>
                      <td className="single  " data-seat={1108202103}>K09</td>
                      <td className="single  " data-seat={1108202118}>K10</td>
                      <td className="single  " data-seat={1108202133}>K11</td>
                      <td className="single  " data-seat={1108202149}>K12</td>
                      <td className="single  " data-seat={1108202166}>K13</td>
                      <td className="single  " data-seat={1108202182}>K14</td>
                      <td className="single  " data-seat={1108202199}>K15</td>
                      <td className="single  " data-seat={1108202215}>K16</td>
                      <td className="single  " data-seat={1108201963}>K17</td>
                      <td className="road" colSpan={2}>V</td>
                    </tr>
                    <tr>
                      <td className="road" colSpan={2}>V</td>
                      <td className="single  " data-seat={1108201974}>L02</td>
                      <td className="single  " data-seat={1108202007}>L03</td>
                      <td className="single  " data-seat={1108202007}>L03</td>
                      <td className="single  " data-seat={1108202024}>L04</td>
                      <td className="single  " data-seat={1108202041}>L05</td>
                      <td className="single  " data-seat={1108202057}>L06</td>
                      <td className="single  " data-seat={1108202073}>L07</td>
                      <td className="single  " data-seat={1108202089}>L08</td>
                      <td className="single  " data-seat={1108202104}>L09</td>
                      <td className="single  " data-seat={1108202119}>L10</td>
                      <td className="single  " data-seat={1108202134}>L11</td>
                      <td className="single  " data-seat={1108202150}>L12</td>
                      <td className="single  " data-seat={1108202167}>L13</td>
                      <td className="single  " data-seat={1108202183}>L14</td>
                      <td className="single  " data-seat={1108202200}>L15</td>
                      <td className="single  " data-seat={1108202216}>L16</td>
                      <td className="single  " data-seat={1108202232}>L17</td>
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
                      <td className="single  " data-seat={1108202201}>M15</td>
                      <td className="single  " data-seat={1108202217}>M16</td>
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
                      <td className="single  " data-seat={1108202218}>N16</td>
                      <td className="single  " data-seat={1108202233}>N17</td>
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
                      <td className="single  " data-seat={1108202219}>O16</td>
                      <td className="single  " data-seat={1108201967}>P01</td>
                      <td className="road" colSpan={2}>V</td>
                    </tr>
                    <tr>
                      <td className="road" colSpan={2}>V</td>
                      <td className="single  " data-seat={1108201978}>P02</td>
                      <td className="single  " data-seat={1108201978}>P02</td>
                      <td className="single  " data-seat={1108202011}>P03</td>
                      <td className="single  " data-seat={1108202028}>P04</td>
                      <td className="single  " data-seat={1108202045}>P05</td>
                      <td className="single  " data-seat={1108202061}>P06</td>
                      <td className="single  " data-seat={1108202077}>P07</td>
                      <td className="single  " data-seat={1108202093}>P08</td>
                      <td className="single  " data-seat={1108202108}>P09</td>
                      <td className="single  " data-seat={1108202123}>P10</td>
                      <td className="single  " data-seat={1108202138}>P11</td>
                      <td className="single  " data-seat={1108202154}>P12</td>
                      <td className="single  " data-seat={1108202171}>P13</td>
                      <td className="single  " data-seat={1108202187}>P14</td>
                      <td className="single  " data-seat={1108202204}>P15</td>
                      <td className="single  " data-seat={1108202220}>P16</td>
                      <td className="single  " data-seat={1108202234}>P17</td>
                      <td className="road" colSpan={2}>V</td>
                    </tr>
                    <tr>
                      <td className="road" colSpan={2}>V</td>
                      <td className="single  " data-seat={1108201968}>Q01</td>
                      <td className="single  " data-seat={1108201979}>Q02</td>
                      <td className="single  " data-seat={1108202012}>Q03</td>
                      <td className="single  " data-seat={1108202029}>Q04</td>
                      <td className="single  " data-seat={1108202046}>Q05</td>
                      <td className="single  " data-seat={1108202062}>Q06</td>
                      <td className="single  " data-seat={1108202078}>Q07</td>
                      <td />
                      <td />
                      <td />
                      <td className="single  " data-seat={1108202139}>Q08</td>
                      <td className="single  " data-seat={1108202155}>Q09</td>
                      <td className="single  " data-seat={1108202172}>Q10</td>
                      <td className="single  " data-seat={1108202188}>Q11</td>
                      <td className="single  " data-seat={1108202205}>Q12</td>
                      <td className="single  " data-seat={1108202221}>Q13</td>
                      <td className="single  " data-seat={1108202235}>Q14</td>
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
                      <td />
                      <td />

                      <td colSpan={2} className="couple  " data-seat={1108202156}>R04</td>
                      <td colSpan={2} className="couple  " data-seat={1108202189}>R05</td>
                      <td colSpan={2} className="couple  " data-seat={1108202222}>R06</td>
                    </tr>
                  </tbody></table>
              </div>
            </div>




            <ul className="cinema-note">
              <li className="single">Ghế thường</li>
              <li className="choosing">Ghế đang chọn</li>
              <li className="busy">Ghế đã chọn</li>
              <li className="road">Lối đi</li>
            </ul>

          </div>

          {/* Container (thanh toán Section) */}
          <div id="pay">
            <div className="ticket-btn">
              <div className="text-center">
                <Link to="/">
                  <button className="btn btn-primary">Hủy</button> &nbsp;&nbsp;
                  </Link>
                <button className="btn btn-primary" data-toggle="modal" data-target="#myModal11" >Thanh toán</button>
              </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="myModal11" role="dialog">
              <div className="modal-dialog">
                {/* Modal content*/}
                <div className="modal-content">
                  <div className="modal-header">
                    <h4><span className="glyphicon glyphicon-lock" /> Thanh toán vé</h4>
                    <button type="button" className="close" data-dismiss="modal">×</button>
                  </div>
                  <div className="modal-body">
                    <form >
                      <div className="form-group">
                        <label htmlFor=""><span className="glyphicon glyphicon-user" /> Tên phim: {this.state.TenFilm} </label><br />
                        <label htmlFor=""><span className="" /> Thời gian chiếu: {this.state.GioChieu.substring(0, this.state.GioChieu.length - 5)}</label><br />
                        <label htmlFor="psw"><span className="" /> Ngày chiếu: {this.state.NgayChieu}</label><br />
                        <label htmlFor="psw"><span className="" /> Tên phòng chiếu: 0{this.state.TenPhong}</label><br />
                        <label htmlFor="psw"><span className="" /> {this.state.choosing.length} ghế: {strghe.substring(0, strghe.length - 2)}</label><br />
                        <label htmlFor="psw"><span className="" /> Số tiền: {this.state.choosing.length * 50000} đồng</label>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-danger btn-default pull-left" data-dismiss="modal">
                      Hủy <span className="glyphicon glyphicon-remove" />
                    </button>
                    <button type="submit" className="btn btn-success" onClick={this.handleOnclickXacNhanDatVe.bind(this)}>Xác nhận
                                <span className="glyphicon glyphicon-ok" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    );
  }
}
export default Seat;
