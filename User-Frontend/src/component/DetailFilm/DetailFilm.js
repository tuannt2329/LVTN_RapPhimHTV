import React from "react";
import FilmNowShowing from './FilmNowShowing/FilmNowShowing'
import TrailerFilm from './TrailerFilm/TrailerFilm';
import axios from "axios";
class DetailFilm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      films: [],
    }
  }

  UNSAFE_componentWillMount() {
    axios.post("http://localhost:8000/film/find")
      .then((res) => {
        this.setStateFilms(res.data)
      })
  }

  setStateFilms = (data) => {
    this.setState({ films: data.film })
  }

  render() {
    return (
      <div>
        <div className="block-wrapper">
          <div className="container">
            <div className="row">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/">Đặt vé</a>
                </li>
                <li className="breadcrumb-item active upper-text">
                  Vô Diện Sát Nhân
                </li>
              </ol>
            </div>
            <div className="row">
              <div className="col-md-8 col-sm-8 col-xs-12">
                <section className="detail-feature">
                  <article>
                    <div className="row">
                      <div className="col-md-4 col-sm-4 col-xs-8 col-xs-offset-2 col-md-offset-0">
                        <div className="detail-feat-img">
                          <img
                            src="htv/website/images//detail-film-VoDienSatNhan.jpg"
                            className="loading"
                            data-was-processed="true" />
                        </div>
                      </div>
                      <div className="details col-md-8 col-sm-8 col-xs-12">
                        <h2 className="detail-title upper-text">
                          Vô Diện Sát Nhân
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
                            <label>Diễn viên:&nbsp;</label>
                            <div className="detail-info-right">
                              <a href="/">Phương Anh Đào,&nbsp;</a>
                              <a href="/">Hiếu Nguyễn,&nbsp;</a>
                              <a href="/">Oanh Kiều</a>
                            </div>
                          </div>
                          <div className="detail-info-row">
                            <label>Thể loại:&nbsp;</label>
                            <div className="detail-info-right">
                              <a href="/">Kinh dị</a>
                            </div>
                          </div>
                          <div className="detail-info-row">
                            <label>Quốc gia:&nbsp;</label>
                            <div className="detail-info-right">
                              <a href="/">Việt Nam</a>
                            </div>
                          </div>
                          <div className="detail-info-row">
                            <label>Nhà sản xuất:&nbsp;</label>
                            <div className="detail-info-right">
                              <a href="/">Điền Quân</a>
                            </div>
                          </div>
                          <div className="detail-info-row">
                            <label>Ngày:&nbsp;</label>
                            <div className="detail-info-right">17/4/2020</div>
                          </div>
                        </div>
                      </div>

                      <div className="muave-detail">
                        <div className="btn-muave-detailfilm">
                          <button id="rating-click"
                            type="submit"
                            className="btn btn-primary btn-sm">Mua vé
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
                                          Liên tục mơ thấy bị một kẻ sát nhân
                                          không mặt mũi giết hàng đêm, cuộc sống
                                          của Phương Anh bị xáo trộn. Thế nhưng,
                                          điều kinh hoàng hơn còn xảy ra, khi
                                          tên Vô Diện Sát Nhân bước ra đời thực
                                          và truy sát cô. Hắn thực sự tồn tại
                                          hay chỉ là nỗi ám ảnh của Phương Anh?
                                        </span>
                                      </span>
                                    </p>

                                    <p>
                                      <span>Phim mới{" "}
                                        <strong>Vô Diện Sát Nhân </strong>
                                        khởi chiếu 17.04.2020 tại các rạp chiếu phim toàn quốc.{" "}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </auto-folded>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </article>
                </section>
              </div>

              <div className="col-md-4 col-sm-4 col-xs-12">
                <section id="movieSidebar" className="hidden-xs">
                  <div className="col-md-10 col-sm-10 col-xs-10 pull-right">
                    <h3 className="size-h3">Phim đang chiếu</h3>
                  </div>
                  <FilmNowShowing films={this.state.films} />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DetailFilm;
