import React from 'react';
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

  render() {
    if(this.props.films[0] && this.state.counter === 0) {
      this.setStateFilms(this.props.films)
    }
    return (
      <div id="main-carousel" data-ride="carousel" data-interval={3000} className="carousel slide">
        <ol className="carousel-indicators hidden-sm hidden-xs">
          
        {this.state.films.map((item, index) =>
          (Date.parse(item["NgayChieu"]) <= Date.parse(Date())) ?
            (index === 0) ?
              <li data-target="#main-carousel" data-slide-to={0} className="active" />
            :
              <li data-target="#main-carousel" data-slide-to={index + 1} />
          :
            null
        )}
        </ol>
        
        <div role="listbox" className="carousel-inner">
          {this.state.films.map((item, index) =>
            (Date.parse(item["NgayChieu"]) <= Date.parse(Date())) ?
              (index === 0) ?
                <a href="/" className="item active">
                  <img key={index} src={item.AnhBia} style={{ width: 1688, height: 500 }}
                    className="lazy hidden-xs hidden-sm loaded" />
                  {/* ReponSive for mobile */}
                  <img key={index} src={item.AnhBia} style={{ width: 1688, height: 500 }}
                    className="lazy hidden-md hidden-lg" />
                </a>
              :
                <a href="/" className="item">
                  <img key={index} src={item.AnhBia} style={{ width: 1688, height: 500 }}
                    className="lazy hidden-xs hidden-sm loaded" />
                  {/* ReponSive for mobile */}
                  <img key={index} src={item.AnhBia} style={{ width: 1688, height: 500 }}
                    className="lazy hidden-md hidden-lg" />
                </a>
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