import React from "react";
import { Link } from 'react-router-dom';
import TrailerFilm from '../TrailerFilm/TrailerFilm';
import axios from "axios";
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.setStateFilms = this.setStateFilms.bind(this)
    this.state = {
      films: [],
      counter: 0,
      following: [],
      theodoi: "Theo dõi",
      like: "Like",
      countLike: 0,
      show: false,
      star: 0,
      rating: false,
      arrRating: [],
      email: ""
    }
  }

  setStateFilms = (data) => {
    this.setState({ films: data, counter: 1, countLike: data[0].LuotLike })
  }

  handleOnclickFilm = (tenphim) => {
    sessionStorage.setItem("tenphim", tenphim);
  }

  handleClickRating = async () => {
    if (localStorage.getItem('user')) {
      if (this.state.rating === false) {
        let rating = this.state.films[0].Rating
        if(!rating) {
          rating = []
        }
        const user = {
          email: JSON.parse(localStorage.getItem('user')).email,
          star: this.state.star
        }
        await rating.push(user)
        this.setState({ arrRating: rating, rating: true })
      }
      const rating = {
        TenFilm: this.state.films[0].TenFilm,
        Rating: this.state.arrRating
      }
      axios.put('http://localhost:8000/film/updaterating', rating)
        .then((res) => {
          if (!res.data.error) {
            console.log(res.data)

          } else {
            return window.alert(res.data.error)
          }
        });
    } else {
      return window.alert("bạn cần đăng nhập trước khi đánh giá phim")
    }
  }

  handleOnclickFollow = async (tenphim) => {
    if (localStorage.getItem('user')) {
      if (this.state.theodoi === "Theo dõi") {
        let following = this.state.films[0].TheoDoi
        await following.push(JSON.parse(localStorage.getItem('user')).email)
        this.setState({ following: following, theodoi: "Bỏ theo dõi" })
      } else {
        let following = this.state.films[0].TheoDoi
        for (var i = 0; i < following.length; i++) {
          if (following[i] === JSON.parse(localStorage.getItem('user')).email) {
            following.splice(i, 1)
            await this.setState({ following: following, theodoi: "Theo dõi" })

          }
        }
      }
      const following = {
        TenFilm: this.state.films[0].TenFilm,
        TheoDoi: this.state.following
      }
      axios.put('http://localhost:8000/film/updatefilm', following)
        .then((res) => {
          if (!res.data.error) {
            console.log(res.data)

          } else {
            return window.alert(res.data.error)
          }
        });
    } else {
      return window.alert("bạn cần đăng nhập trước để theo dõi phim")
    }
  }

  onChangeRating = (e) => {
    this.state.star = 0
    if(e.target.value && !this.state.rating) {
      const star = Number.parseFloat(e.target.value)
      this.setState({star: star})
    }
  }

  handleOnclickLike = async (tenphim) => {
    if (localStorage.getItem('user')) {
      if (this.state.like === "Like") {
        let countLike = this.state.countLike
        countLike++
        await this.setState({ countLike: countLike, like: "Dislike", show: true })
      } else {
        let countLike = this.state.countLike
        countLike--
        await this.setState({ countLike: countLike, like: "Like", show: false })
      }
      const like = {
        TenFilm: this.state.films[0].TenFilm,
        LuotLike: this.state.countLike
      }
      axios.put('http://localhost:8000/film/updatefilm', like)
        .then((res) => {
          if (!res.data.error) {
            console.log(res.data)
          } else {
            return window.alert(res.data.error)
          }
        });
    } else {
      return window.alert("bạn cần đăng nhập trước để thích phim")
    }
  }

  handleCalculateAverageRating = () => {
    let averageRating = 0
    if(this.state.films[0]) {
      console.log(this.state.films[0].Rating.length)
      if(this.state.films[0].Rating.length === 0) {
        return averageRating
      } else {
        for (let i = 0; i < this.state.films[0].Rating.length; i++) {
          averageRating += this.state.films[0].Rating[i]["star"]
        }
        return averageRating/this.state.films[0].Rating.length
      }
    }
  }

  render() {
    if (this.props.films[0] && this.state.counter === 0) {
      this.setStateFilms(this.props.films)
      if (localStorage.getItem('user')) {
        for (let i = 0; i < this.props.films[0].TheoDoi.length; i++) {
          if (this.props.films[0].TheoDoi[i] === JSON.parse(localStorage.getItem('user')).email) {
            this.setState({ theodoi: "Bỏ theo dõi" })
          }
        }
        for (let i = 0; i < this.props.films[0].Rating.length; i++) {
          if (this.props.films[0].Rating[i]["email"] === JSON.parse(localStorage.getItem('user')).email) {
            this.setState({ rating: true, star:this.props.films[0].Rating[i]["star"]})
          }
        }
      }
    }
    return (

      <section className="detail-feature" >
        {this.state.films.map((item, index) =>
          ((Date.parse(item["NgayChieu"]) <= Date.parse(Date())) && (Date.parse(Date()) < (Date.parse(item["NgayKetThuc"])))
            || (Date.parse(item["NgayChieu"]) > Date.parse(Date()))) ?
            <article>
              <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-8 col-xs-offset-2 col-md-offset-0">
                  <div className="detail-feat-img">
                    <img style={{ height: '380px', objectFit: "cover" }}
                      // src="htv/website/images/detail-film-VoDienSatNhan.jpg"
                      src={"http://localhost:8000/images/" + item.AnhBia}
                      className="loading"
                      data-was-processed="true" />
                  </div>
                </div>
                <div className="details col-md-8 col-sm-8 col-xs-12">
                  <h2 className="detail-title upper-text">
                    {item.TenFilm}
                  </h2>

                  <h2 className="detail-title vn upper-text" />
                  <div className="detail-rating">
                    <div className="rating-wrap detail">
                      <div className="rating-movie detail">
                        <div className="rating-value detail">
                          <strong>{this.handleCalculateAverageRating()}</strong>
                          <span>/5</span>
                          <div className="rating-view">
                            <span>{this.state.films[0]["Rating"].length}</span>
                          </div>
                        </div>

                        
                        

                        <div className="rating-user" >
                          <htv-rating>
                            <fieldset class="rating" onChange={this.onChangeRating.bind(this)}>
                              <input type="radio" id="star5" name="rating" value="5" checked={(this.state.star === 5)? true : false}/>
                              <label class="full" for="star5" title="Awesome - 5 stars">
                              </label>

                              <input type="radio" id="star4half" name="rating" value="4.5" checked={(this.state.star === 4.5) ? true : false}/>
                              <label class="half" for="star4half" title="Pretty good - 4.5 stars">
                              </label>

                              <input type="radio" id="star4" name="rating" value="4" checked={(this.state.star === 4)? true : false}/>
                              <label class="full" for="star4" title="Pretty good - 4 stars">
                              </label>

                              <input type="radio" id="star3half" name="rating" value="3.5" checked={(this.state.star === 3.5)? true : false}/>
                              <label class="half" for="star3half" title="Meh - 3.5 stars">
                              </label>

                              <input type="radio" id="star3" name="rating" value="3" checked={(this.state.star === 3)? true : false}/>
                              <label class="full" for="star3" title="Meh - 3 stars">
                              </label>

                              <input type="radio" id="star2half" name="rating" value="2.5" checked={(this.state.star === 2.5)? true : false}/>
                              <label class="half" for="star2half" title="Kinda bad - 2.5 stars">
                              </label>

                              <input type="radio" id="star2" name="rating" value="2" checked={(this.state.star === 2)? true : false}/>
                              <label class="full" for="star2" title="Kinda bad - 2 stars">
                              </label>

                              <input type="radio" id="star1half" name="rating" value="1.5" checked={(this.state.star === 1.5)? true : false}/>
                              <label class="half" for="star1half" title="Meh - 1.5 stars">
                              </label>

                              <input type="radio" id="star1" name="rating" value="1" checked={(this.state.star === 1)? true : false}/>
                              <label class="full" for="star1" title="Sucks big time - 1 star">
                              </label>

                              {/* <input type="radio" id="starhalf" name="rating" value="0.5" />
                              <label class="half" for="starhalf" title="Sucks big time - 0.5 stars">
                              </label> */}
                            </fieldset>
                          </htv-rating>
                        </div>
                        
                        {
                          (!this.state.rating) ?
                            <div className="rating-bt">
                              <div className="btn-xemtrailer-detailfilm">
                                <button className="btn btn-primary btn-sm" onClick={this.handleClickRating.bind(this)}>Đánh giá</button>
                              </div>
                            </div>
                          :
                            null
                        }

                        {/* Video Trailer Film */}
                        <div className="rating-bt">
                          <div className="btn-xemtrailer-detailfilm">
                            <TrailerFilm films={item} />
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  <div className="detail-rating">
                    <span>
                      <img src='htv/website/images/ic-clock.jpg' className="ic-clock"></img>
                      <i></i>&nbsp; 180 phút
                          </span>&nbsp;&nbsp;

                    <span className="like">
                      <div >
                        <span>
                          <button type="submit" className="inlineBlock _2tga _89n_ _8j9v"
                            title="Thích Phim" onClick={this.handleOnclickLike.bind(this, item.TenFilm)}>

                            <span className="_3jn- inlineBlock _2v7">
                              {
                                this.state.show === false
                                  ?
                                  <div className="_49vg">
                                    {/* ic like */}
                                    <img className="_1pbs inlineBlock img"
                                      src="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/M-ZBUCzfbNp.png"
                                      title="Nhấn vào để thích phim" width={16} height={16} />
                                  </div>
                                  :
                                  <div className="_5n2y">
                                    {/* ic tick */}
                                    <img className="_1pbs inlineBlock img"
                                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/VD7zCGNYDhP.png" alt=""
                                      title="Nhấn để bỏ thích phim"
                                      width={16} height={16} />
                                  </div>
                              }

                            </span>
                            <span className="_49vh _2pi7">Thích</span>
                            <span className="_5n6h _2pih" id="u_0_3">{this.state.countLike}</span>
                          </button>
                        </span>
                      </div>
                    </span>


                  </div>

                  <div className="detail-info">
                    <div className="detail-info-row">
                      <label>Đạo diễn:&nbsp;</label>
                      <div className="detail-info-right">
                        <a href>{item.DaoDien}</a>
                      </div>
                    </div>
                    <div className="detail-info-row">
                      <label>Thể loại:&nbsp;</label>
                      <div className="detail-info-right">
                        <a href>{item.TheLoai}</a>
                      </div>
                    </div>
                    <div className="detail-info-row">
                      <label>Quốc gia:&nbsp;</label>
                      <div className="detail-info-right">
                        <a href>{item.TenNuocSX}</a>
                      </div>
                    </div>
                    <div className="detail-info-row">
                      <label>Diễn viên:&nbsp;</label>
                      <div className="detail-info-right">
                        {
                          (item.TenFilm === "Bloodshot") ?
                            <a>Vin Diesel, Eiza González, Sam Heughan</a>
                          : 
                            <a  style={{color: 'white'}}>.</a>
                        }
                      </div>
                    </div>
                    <div className="detail-info-row">
                      <label>Khởi chiếu:&nbsp;</label>
                      <div className="detail-info-right">{item.NgayChieu.substring(0, item.NgayChieu.length - 14)} - {item.NgayKetThuc.substring(0, item.NgayKetThuc.length - 14)}</div>
                    </div>
                  </div>
                </div>

                <div className="muave-detail">
                  <div className="btn-muave-detailfilm">
                    <Link to={{ pathname: "/seat", film: item, reload: "abc" }}>
                      <button id="rating-click"
                        type="submit"
                        className="btn btn-primary btn-sm" onClick={this.handleOnclickFilm.bind(this, item.TenFilm)}>
                        Đặt vé
                      </button>
                    </Link>
                    &nbsp; &nbsp; &nbsp;
                    <button id="rating-click"
                      type="submit"
                      className="btn btn-primary btn-sm" onClick={this.handleOnclickFollow.bind(this, item.TenFilm)}>
                      {this.state.theodoi}
                    </button>
                  </div>
                </div>
              </div>

              <div className="row detail-description">
                <div className="col-md-12 col sm-12 col-xs-12">
                  <div className="content-text">
                    <section id="info">
                      <h3>Nội dung phim</h3>
                      <div className="content-text-actors-info content-text">
                        <br />
                        <auto-folded folded-height={200}>
                          <div>
                            <div className="shadow hidden" />
                            <div className="auto-folded" style={{ display: "block" }}>
                              <p>&nbsp;</p>
                              <p>
                                <span style={{ fontSize: "15px" }}>
                                  <span>
                                    {item.TomTat}
                                  </span>
                                </span>
                              </p>

                              {/* <p>
                                <span>Phim mới{" "}
                                  <strong>Vô Diện Sát Nhân </strong>
                                        khởi chiếu 17.04.2020 tại các rạp chiếu phim toàn quốc.{" "}
                                </span>
                              </p> */}
                            </div>
                          </div>
                        </auto-folded>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </article>

            :
            null

        )}
      </section>
    );
  }
}
export default Detail;
