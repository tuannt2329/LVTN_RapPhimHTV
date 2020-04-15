import React from 'react';
import Slide from './Slide/Slide';
import TabMovie from './TabMovie/TabMovie';
import axios from "axios";
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        films: []
    }
  }

  UNSAFE_componentWillMount() {
      axios.post("http://localhost:8000/film/find")
          .then((res) => {
            console.log(res);
            this.setStateFilms(res.data)
          })
  }

  setStateFilms = (data) => {
      this.setState({ films: data.film })
  } 
  
  render() {
    return (
      <div>
        {/* Slide Carousel, Mua vé Nhanh */}
        <Slide films={this.state.films}/>
        {/* Tab Phim đang chiếu, Phim sắp chiếu page home */}
        <TabMovie films={this.state.films}/>
      </div>
    );
  }
}
export default Home;