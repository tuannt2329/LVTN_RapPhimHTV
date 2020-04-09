import React from 'react';

class TabMovie extends React.Component {
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

  render() {
    if(this.props.films[0] && this.state.counter === 0) {
      this.setStateFilms(this.props.films)
    }
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
                  </ul>
                  <div className="tab-content">
                    <div id="tab_default_1" className="tab-pane active">
                      <div className="row movies-group animated fadeInUp">
                      {this.state.films.map((item, index) =>
                        (Date.parse(item["NgayChieu"]) <= Date.parse(Date())) ?
                          <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                            <div className="article-movie-home">
                              <img style={{ width: 400, height: 300 }}
                                key={index} src={item.AnhBia}
                                className="lazy loaded" />
                              <a href="/">
                                <div className="decription-hover overlay">
                                  <div className="movies-content">
                                    <div className="group">
                                      <div className="btn secondary-white">mua vé</div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="title-movie">
                              <h4 className="upper-text">{item.TenFilm}</h4>
                            </div>
                          </div>
                        :
                          null
                        
                      )}
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 pull-right">
                          <a href="/" className="btn secondary fl-right">Xem thêm</a>
                        </div>
                      </div>
                    </div>

                    {/* Phim sắp chiếu */}
                    <div id="tab_default_2" className="tab-pane">
                      <div className="row movies-group animated fadeInUp">
                      {this.state.films.map((item, index) =>
                        (Date.parse(item["NgayChieu"]) > Date.parse(Date())) ?
                          <div className="col-md-4 col-sm-4 col-xs-6 movie-item">
                            <div className="article-movie-home">
                              <img style={{ width: 400, height: 300 }}
                                key={index} src={item.AnhBia}
                                className="lazy loaded" />
                              <a href="/">
                                <div className="decription-hover overlay">
                                  <div className="movies-content">
                                    <div className="group">
                                      <div className="btn secondary-white">mua vé</div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="title-movie">
                              <h4 className="upper-text">{item.TenFilm}</h4>
                            </div>
                          </div>
                        :
                          null
                      )}
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 pull-right">
                          <a href="/" className="btn secondary fl-right">Xem thêm</a>
                        </div>
                      </div>
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