import React from "react";
class FilmNowShowing extends React.Component {
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
        if (this.props.films[0] && this.state.counter === 0) {
            this.setStateFilms(this.props.films)
        }
        return (
            <div>
                <div className="row movies-group">
                    {this.state.films.map((item, index) =>
                        ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))) ?
                            <div className="col-md-10 col-sm-10 col-xs-10 pull-right">
                                <div className="article-movie-home">
                                    <img style={{ height: 200 }}
                                        key={index}
                                        src={"http://localhost:8000/images/" + item.AnhBia}
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
                    <div className="row">
                        <div className="col-md-10 col-sm-10 col-xs-10 pull-right">
                            <a href="/"
                                className="btn secondary fl-right btn-xemthem-detailfilm">
                                Xem thêm
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FilmNowShowing;
