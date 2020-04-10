import React from "react";
import ReactPlayer from "react-player";

class TrailerFilm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "https://www.youtube.com/embed/WhWc3b3KhnY",
      url: ""
    }
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ url: this.state.inputValue })
  }

  render() {
    const styleVideo = {
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
    };

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
                <h4 className="modal-title">Spring - Blender Open Movie</h4>
              </div>
              <div id="galaxyVideo" className="modal-body">
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
