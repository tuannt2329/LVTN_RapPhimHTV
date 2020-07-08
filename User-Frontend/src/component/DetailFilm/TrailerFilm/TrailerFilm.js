import React from "react";
import ReactPlayer from "react-player";
import axios from "axios";

class TrailerFilm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.films.Trailer,
      url: "",
      films: [],
      counter: 0,
    }
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ url: this.state.inputValue })
  }

  setStateFilms = (data) => {
    this.setState({ films: data.film, counter: 1 })
  }

  UNSAFE_componentWillMount() {
    var TenFilm = { TenFilm: sessionStorage.getItem('tenphim') };
    axios.post("http://localhost:8000/film/find", TenFilm)
      .then(async (res) => {
        await this.setStateFilms(res.data);
      })
  }

  render() {
    const styleVideo = {
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
    };

    if (this.props.films[0] && this.state.counter === 0) {
      this.setStateFilms(this.props.films)
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button className="btn btn-primary btn-sm"
            data-toggle="modal" data-target="#trailerModal">Xem Trailer</button>
        </form>

        <div id="trailerModal" className="modal fade modal-trailer" tabindex="-1" role="dialog"
          aria-labelledby="trailerModal" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" data-dismiss="modal" aria-hidden="true" className="close">×</button>
                {this.state.films.map((item, index) =>
                  ((Date.parse(item["NgayChieu"]) < (Date.parse(item["NgayKetThuc"])))) ?
                    <h4 className="modal-title name-trailer">{item.TenFilm}</h4>
                    :
                    null
                )}
              </div>
              <div className="modal-body">
                <ReactPlayer className="video-trailer" style={styleVideo} url={this.state.url} controls={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TrailerFilm;
