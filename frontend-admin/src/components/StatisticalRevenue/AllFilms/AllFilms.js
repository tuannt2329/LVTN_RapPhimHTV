import React, { Component } from "react";
import Menu from "../../Menu/Menu";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

class AllFilms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
    };
  }

  UNSAFE_componentWillMount() {
    this.isLocalStorage();
    axios.post("http://htvcinemas.live:8000/film/find").then((res) => {
      this.setStateFilms(res.data);
    });
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
    this.setState({ films: filmarr });
  };

  isLocalStorage = () => {
    if (JSON.parse(sessionStorage.getItem("user")) != null) {
      var username = JSON.parse(sessionStorage.getItem("user"))["firstName"]
        ? JSON.parse(sessionStorage.getItem("user"))["firstName"]
        : null;
    }
    if (!username) return (window.location = "/");
  };

  handleOnclickFilm = (tenphim) => {
    sessionStorage.setItem("tenphim", tenphim);
  };

  render() {
    var currentdate = new Date();
    var datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return (
      <div>
        <Menu />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>All Films</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/menu">Home</a>
                    </li>
                    <li className="breadcrumb-item active">AllFilms</li>
                  </ol>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Tabs
                    id="controlled-tab-example"
                    //   activeKey={key}
                    //   onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="phimdahetchieu" title="Phim Đã Hết Chiếu">
                      <div className="row">
                        {this.state.films
                          .filter(
                            (a) => (Date.parse(Date()) > (Date.parse(a["NgayKetThuc"])))
                          )
                          .map((item, index) =>
                            index === 0 ? (
                              <div className="col-md-6">
                                <div className="card">
                                  <div className="card-body">
                                    <div>
                                      <div className="carousel-inner">
                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                          <a
                                            href="/statisticalRevenue"
                                            onClick={this.handleOnclickFilm.bind(
                                              this,
                                              item.TenFilm
                                            )}
                                          >
                                            <center>
                                              <dt>{item.TenFilm}</dt>
                                            </center>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="col-md-6">
                                <div className="card">
                                  <div className="card-body">
                                    <div>
                                      <div className="carousel-inner">
                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                          <a
                                            href="/statisticalRevenue"
                                            onClick={this.handleOnclickFilm.bind(
                                              this,
                                              item.TenFilm
                                            )}
                                          >
                                            <center>
                                              <dt>{item.TenFilm}</dt>
                                            </center>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </Tab>
                    <Tab eventKey="phimdangchieu" title="Phim Đang Chiếu">
                      <div className="row">
                        {this.state.films
                          .filter(
                            (a) => (Date.parse(a.NgayChieu) <= Date.parse(Date())
                               && (Date.parse(Date()) < (Date.parse(a["NgayKetThuc"]))))
                          )
                          .map((item, index) =>
                            index === 0 ? (
                              <div className="col-md-6">
                                <div className="card">
                                  <div className="card-body">
                                    <div>
                                      <div className="carousel-inner">
                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                          <a
                                            href="/statisticalRevenue"
                                            onClick={this.handleOnclickFilm.bind(
                                              this,
                                              item.TenFilm
                                            )}
                                          >
                                            <center>
                                              <dt>{item.TenFilm}</dt>
                                            </center>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="col-md-6">
                                <div className="card">
                                  <div className="card-body">
                                    <div>
                                      <div className="carousel-inner">
                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                          <a
                                            href="/statisticalRevenue"
                                            onClick={this.handleOnclickFilm.bind(
                                              this,
                                              item.TenFilm
                                            )}
                                          >
                                            <center>
                                              <dt>{item.TenFilm}</dt>
                                            </center>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
              <a
                id="back-to-top"
                href="#"
                className="btn btn-primary back-to-top"
                role="button"
                aria-label="Scroll to top"
              >
                <i className="fas fa-chevron-up" />
              </a>
              {/* /.content-wrapper */}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default AllFilms;
