import React from 'react';
import Slide from './Slide/Slide';
import TabMovie from './TabMovie/TabMovie';
import axios from "axios";
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      films: [], show: false
    }
  }

  setStateFilms = async (data) => {
   await this.setState({ films: data.film })
   await console.log('state', this.state.films);
   await this.setState({ show: true })
  }

  UNSAFE_componentWillMount() {
    axios.post("http://conallserver.ddns.net:8000/film/find")
      .then(async(res) => {
        await this.setStateFilms(res.data);
      })
  }



  render() {
    return (
      <div>
        {this.state.show === true ?
          <div>
            {/* Slide Carousel, Mua vé Nhanh */}
            <Slide films={this.state.films} />
            {/* Tab Phim đang chiếu, Phim sắp chiếu page home */}
            <TabMovie films={this.state.films} />
          </div>
          : null}
      </div>
    );
  }
}
export default Home;