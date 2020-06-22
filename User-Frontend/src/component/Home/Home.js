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

  dynamicsort = (property) => {
    return function (a, b){
        // a should come before b in the sorted order
        if(a[property] < b[property]){
                return -1;
        // a should come after b in the sorted order
        }else if(a[property] > b[property]){
                return 1;
        // a and b are the same
        }else{
                return 0;
        }
    }
  }

  setStateFilms = (data) => {
    let filmarr = data.film
    filmarr.sort(this.dynamicsort("TenFilm"))
    this.setState({ films: filmarr, show: true })
  }

  UNSAFE_componentWillMount() {
    axios.post("http://localhost:8000/film/find")
      .then(async(res) => {
        await this.setStateFilms(res.data);
      })
  }



  render() {
    console.log(this.state.films)
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