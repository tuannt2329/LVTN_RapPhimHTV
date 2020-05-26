import React from "react";
import { Link } from 'react-router-dom';
import TrailerFilm from '../TrailerFilm/TrailerFilm';
class Detail extends React.Component {
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
                          <strong>7.4</strong>
                          <span>/10</span>
                          <div className="rating-view">
                            <span>48</span>
                          </div>
                        </div>

                        {/* Video Trailer Film */}
                        <div className="rating-bt">
                          <div className="btn-xemtrailer-detailfilm">
                            <TrailerFilm />
                          </div>
                        </div>

                        <div className="rating-bt">
                          <div className="btn-xemtrailer-detailfilm">
                            <button className="btn btn-primary btn-sm">Đánh giá</button>
                          </div>
                        </div>

                        <div className="rating-user" >
                          <htv-rating
                            value="7.375010967254639">
                            <fieldset class="rating">
                              <input type="radio" id="star5" name="rating" value="5" />
                              <label class="full" for="star5" title="Awesome - 5 stars">
                              </label>

                              <input type="radio" id="star4half" name="rating" value="4 and a half" />
                              <label class="half" for="star4half" title="Pretty good - 4.5 stars">
                              </label>

                              <input type="radio" id="star4" name="rating" value="4" />
                              <label class="full" for="star4" title="Pretty good - 4 stars">
                              </label>

                              <input type="radio" id="star3half" name="rating" value="3 and a half" />
                              <label class="half" for="star3half" title="Meh - 3.5 stars">
                              </label>

                              <input type="radio" id="star3" name="rating" value="3" />
                              <label class="full" for="star3" title="Meh - 3 stars">
                              </label>

                              <input type="radio" id="star2half" name="rating" value="2 and a half" />
                              <label class="half" for="star2half" title="Kinda bad - 2.5 stars">
                              </label>

                              <input type="radio" id="star2" name="rating" value="2" />
                              <label class="full" for="star2" title="Kinda bad - 2 stars">
                              </label>

                              <input type="radio" id="star1half" name="rating" value="1 and a half" />
                              <label class="half" for="star1half" title="Meh - 1.5 stars">
                              </label>

                              <input type="radio" id="star1" name="rating" value="1" />
                              <label class="full" for="star1" title="Sucks big time - 1 star">
                              </label>

                              <input type="radio" id="starhalf" name="rating" value="half" />
                              <label class="half" for="starhalf" title="Sucks big time - 0.5 stars">
                              </label>
                            </fieldset>
                          </htv-rating>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="detail-rating">
                    <span>
                      <img src='htv/website/images/ic-clock.jpg' className="ic-clock"></img>
                      <i></i>&nbsp; 180 phút
                          </span>
                    <span className="like">
                      <div className="fb-like fb_iframe_widget">
                        <span>
                          <iframe
                            src="https://www.facebook.com/v2.9/plugins/like.php?action=like&app_id=1427253957539434&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D46%23cb%3Dfab96241442294%26domain%3Dwww.galaxycine.vn%26origin%3Dhttps%253A%252F%252Fwww.galaxycine.vn%252Ff1666ba3d43588%26relation%3Dparent.parent&container_width=0&href=https%3A%2F%2Fwww.galaxycine.vn%2Fdat-ve%2Fvo-dien-sat-nhan&layout=button_count&locale=vi_VN&sdk=joey&share=true&show_faces=false&size=small"
                            style={{
                              border: "none",
                              visibility: "visible",
                              width: "138px",
                              height: "20px",
                            }}
                            className
                          />
                        </span>
                      </div>
                    </span>
                  </div>

                  <div className="detail-info">
                    <div className="detail-info-row">
                      <label>Đạo diễn:&nbsp;</label>
                      <div className="detail-info-right">
                        <a href="/">{item.DaoDien}</a>
                      </div>
                    </div>
                    <div className="detail-info-row">
                      <label>Thể loại:&nbsp;</label>
                      <div className="detail-info-right">
                        <a href="/">{item.TheLoai}</a>
                      </div>
                    </div>
                    <div className="detail-info-row">
                      <label>Quốc gia:&nbsp;</label>
                      <div className="detail-info-right">
                        <a href="/">{item.TenNuocSX}</a>
                      </div>
                    </div>
                    <div className="detail-info-row">
                      <label>Diễn viên:&nbsp;</label>
                      <div className="detail-info-right">
                        <a href="/">a</a>
                      </div>
                    </div>
                    <div className="detail-info-row">
                      <label>Khởi chiếu:&nbsp;</label>
                      <div className="detail-info-right">{item.NgayChieu} - {item.NgayKetThuc}</div>
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
