import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import moment from 'moment'

class TabMovie extends React.Component {
  constructor(props) {
    super(props)
    console.log('from hommmmeeee', props.films)
    // console.log('from ', this.props.match.params.id)
    this.setStateFilms = this.setStateFilms.bind(this)
    this.state = {
      films: [],
      counter: 0,
      arrday: [0, 1, 2, 3, 4, 5, 6],
      arrDate: [],
      days: [],
      FilmClicked: []
    }
  }

  setStateFilms = (data) => {
    console.log(data)
    this.handleDateNow()
    this.setState({ films: data, counter: 1 })
  }

  handleOnclickFilm = (tenphim) => {
    sessionStorage.setItem("tenphim", tenphim);
  }

  handleDateNow = () => {
    let arrDate = []
    let days = []
    this.state.arrday.forEach((element) => {
      arrDate.push(moment().add(element, 'days').format('YYYY-MM-DD'))
      days.push(moment(moment().add(element, 'days').format('YYYY-MM-DD')).day() + 1)
    })
    this.setState({ arrDate: arrDate, days: days })
  }

  HandleClickNgay = (ngaychieu) => {
    let FilmClicked = this.state.FilmClicked
    FilmClicked = []
    let deleted = {
      deleted: false
    }
    axios.post('http://localhost:8000/schedule/find', deleted)
      .then((res) => {
        if (!res.data.error) {
          res.data.schedule.forEach((data) => {
            let dateshow = moment().format(data.ThoiGianChieu.slice(0,10), "YYYY-MM-DD")
            if(dateshow === ngaychieu) {
              this.state.films.forEach((element) => {
                let timeNow = moment().format('HH:MM:SS')
                let time = moment().format(data.ThoiGianChieu.slice(11,19), "HH:MM:SS")
                if(data.TenFilm === element.TenFilm && time > timeNow) {
                  let count = 0
                  for (let i = 0; i < FilmClicked.length; i++) {
                    if(FilmClicked[i].TenFilm === element.TenFilm) {
                      break;
                    } else {
                      count++
                    }
                  }
                  if(count === FilmClicked.length) {
                    FilmClicked.push(element)
                  }
                }
              })
            }
          })
        }
        this.setState({FilmClicked: FilmClicked})
      })
   

    // stt = []
    // strghe = ""
    // tongtien = 0
    // this.setState({ GioChieu: '', Ghe: [], choosing: [], TongTienVe: 0 })
    // this.setState({ NgayChieu: ngaychieu });
  }

  render() {
    if (this.props.films[0] && this.state.counter === 0) {
      this.setStateFilms(this.props.films)
    }
    console.log(this.state.FilmClicked)
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tab-movies">
                <div className="tab-movies-line">
                  <ul className="nav nav-tabs movie-home">
                    <li className="active">
                      <a href="#tab_default_1" data-toggle="tab">Phim đang chiếu</a>
                    </li>
                    <li>
                      <a href="#tab_default_2" data-toggle="tab">Phim sắp chiếu</a>
                    </li>
                    <li>
                      <a href="#tab_default_3" data-toggle="tab">Phim theo ngày</a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div id="tab_default_1" className="tab-pane active">
                      <div className="row movies-group animated fadeInUp">
                        {this.state.films.map((item, index) =>
                          ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))) ?
                            <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                              <div className="article-movie-home">
                                <img style={{ height: 264 }}
                                  key={index}
                                  src={"http://localhost:8000/images/" + item.AnhBia}
                                  className="lazy loaded" />
                                <Link to="/detailfilm" onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
                                  <div className="decription-hover overlay">
                                    <div className="movies-content">
                                      <div className="group">
                                        <div className="content-text-actors-info content-text">
                                          <auto-folded folded-height={200}>
                                            <div>
                                              <div className="shadow hidden" />
                                              <div className="auto-folded bot-text" style={{ display: "block" }}>
                                                <p className="p-tabmovie">
                                                  {item.TomTat}
                                                </p>
                                              </div>
                                            </div>
                                          </auto-folded>
                                        </div>
                                        <div className="btn secondary-white">mua vé</div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                              <div className="title-movie">
                                <h4 className="upper-text">{item.TenFilm}</h4>
                              </div>
                            </div>
                            :
                            null

                        )}
                      </div>
                      {/* <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 pull-right">
                          <a href="/" className="btn secondary fl-right">Xem thêm</a>
                        </div>
                      </div> */}
                    </div>

                    {/* Phim sắp chiếu */}
                    <div id="tab_default_2" className="tab-pane">
                      <div className="row movies-group animated fadeInUp">
                        {this.state.films.map((item, index) =>
                          (Date.parse(item["NgayChieu"]) > Date.parse(Date())) ?
                            <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                              <div className="article-movie-home">
                                <img style={{ height: 264 }}
                                  key={index}
                                  src={"http://localhost:8000/images/" + item.AnhBia}
                                  className="lazy loaded" />
                                <Link to="/detailfilm" onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
                                  <div className="decription-hover overlay">
                                    <div className="movies-content">
                                      <div className="group">
                                        <div className="content-text-actors-info content-text">
                                          <auto-folded folded-height={200}>
                                            <div>
                                              <div className="shadow hidden" />
                                              <div className="auto-folded bot-text" style={{ display: "block" }}>
                                                <p className="p-tabmovie">
                                                  {item.TomTat}
                                                </p>
                                              </div>
                                            </div>
                                          </auto-folded>
                                        </div>
                                        <div className="btn secondary-white">mua vé</div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                              <div className="title-movie">
                                <h4 className="upper-text">{item.TenFilm}</h4>
                              </div>
                            </div>
                            :
                            null
                        )}
                      </div>
                      {/* <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 pull-right">
                          <a href="/" className="btn secondary fl-right">Xem thêm</a>
                        </div>
                      </div> */}
                    </div>

                    <div id="tab_default_3" className="tab-pane">
                      <div className="row movies-group animated fadeInUp">
                      
                        <div className="row padding-pickday">
                          <div className="lich-chieu-phim showtimes flex-viewport">
                            <div className="list--times ">
                              <div className="flexslider carousel">
                                <div className="flex-viewport" style={{ overflow: 'hidden', position: 'relative' }}>
                              <ul className="tab--showtimes-controls slides">
                                {
                                  this.state.arrDate.map((element, index) =>
                                    <li className="padding-time"
                                      style={{ width: '100px', marginRight: '0px', float: 'left', display: 'block' }}>
                                      <a id="showtime-tab-1" onClick={this.HandleClickNgay.bind(this, element)}
                                        className="tab--control js__tab_time_control not_active added-transaction-id js__active">
                                        {
                                          (this.state.days[index]) ?
                                            (this.state.days[index] !== 1) ? 
                                            <span className="week">Thứ {this.state.days[index]}</span>
                                            :
                                            <span className="week">Chủ nhật</span>
                                          : 
                                            null
                                        }
                                        <br/>
                                        <span className="day" value={element}>{element}</span>
                                      </a>
                                    </li>
                                  )
                                }
                              </ul>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                          
                        { (this.state.FilmClicked.length != 0) ?
                        this.state.FilmClicked.map((item, index) =>
                          <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                            <div className="article-movie-home">
                              <img style={{ height: 264 }}
                                key={index}
                                src={"http://localhost:8000/images/" + item.AnhBia}
                                className="lazy loaded" />
                              <Link to="/detailfilm" onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
                                <div className="decription-hover overlay">
                                  <div className="movies-content">
                                    <div className="group">
                                      <div className="content-text-actors-info content-text">
                                        <auto-folded folded-height={200}>
                                          <div>
                                            <div className="shadow hidden" />
                                            <div className="auto-folded bot-text" style={{ display: "block" }}>
                                              <p className="p-tabmovie">
                                                {item.TomTat}
                                              </p>
                                            </div>
                                          </div>
                                        </auto-folded>
                                      </div>
                                      <div className="btn secondary-white">mua vé</div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div className="title-movie">
                              <h4 className="upper-text">{item.TenFilm}</h4>
                            </div>
                          </div>
                        )
                        : 
                          <div>Hiện tại không có phim đang chiếu</div>
                        }
                      </div>
                      {/* <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 pull-right">
                          <a href="/" className="btn secondary fl-right">Xem thêm</a>
                        </div>
                      </div> */}
                    </div>
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
export default TabMovie;