import React from "react";
import FilmNowShowing from './FilmNowShowing/FilmNowShowing';
import TrailerFilm from './TrailerFilm/TrailerFilm';
import axios from "axios";
import Detail from "./Detail/Detail";
class DetailFilm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      films: [],
      Film: null,
    }
  }

  UNSAFE_componentWillMount() {
    var TenFilm = { TenFilm: sessionStorage.getItem('tenphim') };

    // axios.post("http://conallserver.ddns.net:8000/film/find", TenFilm)
    //   .then((res) => {
    //     this.setStateFilms(res.data);
    //     axios.post("http://conallserver.ddns.net:8000/film/find")
    //       .then((res1) => {
    //         console.log(res1.data);
    //       })
    //   })

    // axios.post("http://conallserver.ddns.net:8000/film/find", TenFilm)
    // .then((res) => {
    //     this.setStateFilms(res.data.film[0]);
    //     axios.post("http://conallserver.ddns.net:8000/film/find")
    //       .then((res1) => {
    //         console.log(res1.data);
    //       })
    //   });

    axios.post("http://conallserver.ddns.net:8000/film/find", TenFilm)
      .then((res) => {
        this.setStateFilms(res.data)
      })
  }

  setStateFilms = (data) => {
    this.setState({ films: data.film })
  }


  render() {

    return (
    
        <div className="block-wrapper">
          <div className="container">
            <div className="row">
              <ol className="breadcrumb font-nav-detailfilm">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/">Đặt vé</a>
                </li>
                {this.state.films.map((item, index) =>
                  ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))) ?
                    <li className="breadcrumb-item active upper-text">
                     {item.TenFilm}
                </li>
                    :
                    null
                )}
              </ol>
            </div>

            <div className="row">
              <div className="col-md-8 col-sm-8 col-xs-12">
                <Detail films={this.state.films} />
              </div>

              <div className="col-md-4 col-sm-4 col-xs-12">
                <section id="movieSidebar" className="hidden-xs">
                  <div className="col-md-10 col-sm-10 col-xs-10 pull-right">
                    <h3 className="size-h3">Phim đang chiếu</h3>
                  </div>
                  <FilmNowShowing films={this.state.films} />
                </section>
              </div>
            </div>
          </div>
        </div>
     
    );


  }
}
export default DetailFilm;
