import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class Slide extends React.Component {
  constructor(props) {
    super(props)
    this.setStateFilms = this.setStateFilms.bind(this)
    this.state = {
      films: [],
      counter: 0
    }
  }

  setStateFilms = (data) => {
    console.log(data)
    this.setState({ films: data, counter: 1 })
  }

  handleOnclickFilm = (tenphim) => {
    sessionStorage.setItem("tenphim", tenphim);
  }

  render() {
    if (this.props.films[0] && this.state.counter === 0) {
      this.setStateFilms(this.props.films)
    }
    return (
      <div id="main-carousel" data-ride="carousel" data-interval={3000} className="carousel slide">
        <ol className="carousel-indicators hidden-sm hidden-xs">

          {this.state.films.map((item, index) =>
            ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))
              || (Date.parse(item["NgayChieu"]) > Date.parse(Date()))) ?
              (index === 0) ?
                <li data-target="#main-carousel" data-slide-to={0} className="active" />
                :
                <li data-target="#main-carousel" data-slide-to={index} />
              :
              null
          )}
        </ol>

        <div role="listbox" className="carousel-inner">
          {this.state.films.map((item, index) =>
            ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))
              || (Date.parse(item["NgayChieu"]) > Date.parse(Date()))) ?
              (index === 0) ?
                <Link to="/detailfilm" onClick={this.handleOnclickFilm.bind(this, item.TenFilm)} className="item active">
                  <img style={{ width: 1688, height: 505 }}
                    key={index}
                    src={"http://htvcinemas.live:8000/images/" + item.AnhBia}
                    className="lazy hidden-xs hidden-sm loaded" />
                  {/* ReponSive for mobile */}
                  <img style={{ width: 400, height: 200 }}
                    key={index}
                    src={"http://htvcinemas.live:8000/images/" + item.AnhBia}
                    className="lazy hidden-md hidden-lg" />
                </Link>
                :
                <Link to="/detailfilm" onClick={this.handleOnclickFilm.bind(this, item.TenFilm)} className="item">
                  <img style={{ width: 1688, height: 505 }}
                    key={index}
                    src={"http://htvcinemas.live:8000/images/" + item.AnhBia}
                    className="lazy hidden-xs hidden-sm loaded" />
                  {/* ReponSive for mobile */}
                  <img style={{ width: 400, height: 200 }}
                    key={index}
                    src={"http://htvcinemas.live:8000/images/" + item.AnhBia}
                    className="lazy hidden-md hidden-lg" />
                </Link>
              :
              null
          )}
        </div>

        {/* Button Pre,Next Carousel */}
        <a role="button" href="#main-carousel" data-slide="prev" className="left carousel-control hidden-xs hidden-sm">
          <span aria-hidden="true" className="glyphicon glyphicon-chevron-left" />
          <span className="sr-only">Previous</span>
        </a>
        <a role="button" href="#main-carousel" data-slide="next" className="right carousel-control hidden-xs hidden-sm">
          <span aria-hidden="true" className="glyphicon glyphicon-chevron-right" />
          <span className="sr-only">Next</span>
        </a>
      </div>

    );
  }
}
export default Slide;