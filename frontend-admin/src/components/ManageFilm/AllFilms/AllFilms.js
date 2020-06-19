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

  setStateFilms = (data) => {
    this.setState({ films: data.film });
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

  handleOnclickDelete = (tenphim) => {
    if (window.confirm("Do you really want to delete?")) {
      var tenfilm = { TenFilm: tenphim };
      axios
        .put("http://htvcinemas.live:8000/film/deletefilm", tenfilm)
        .then((res) => {
          window.location.reload();
        });
    }
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
    console.log(datetime);
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
                    <Tab eventKey="phimdangchieu" title="Phim Đang Chiếu">
                      <div className="row">
                        {this.state.films
                          .filter(
                            (a) => Date.parse(a.NgayChieu) <=Date.parse(Date())
                          )
                          .map((item, index) =>
                            index === 0 ? (
                              <div className="col-md-6">
                                <div className="card">
                                  <div className="card-body">
                                    <button
                                      className="btn btn-danger btn-sm float-right"
                                      onClick={this.handleOnclickDelete.bind(
                                        this,
                                        item.TenFilm
                                      )}
                                    >
                                      <i className="fas fa-trash float-right"></i>
                                      Delete
                                    </button>
                                    <div>
                                      <div className="carousel-inner">
                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                          <a
                                            href="/updatefilm"
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
                                    <button
                                      className="btn btn-danger btn-sm float-right"
                                      onClick={this.handleOnclickDelete.bind(
                                        this,
                                        item.TenFilm
                                      )}
                                    >
                                      <i className="fas fa-trash float-right"></i>
                                      Delete
                                    </button>
                                    <div>
                                      <div className="carousel-inner">
                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                          <a
                                            href="/updatefilm"
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

                    <Tab eventKey="phimsapchieu" title="Phim Sắp Chiếu">
                      <div className="row">
                        {this.state.films.filter(
                            (a) => Date.parse(a.NgayChieu) > Date.parse(Date())
                          ).map((item, index) =>
                          index === 0 ? (
                            <div className="col-md-6">
                              <div className="card">
                                <div className="card-body">
                                  <button
                                    className="btn btn-danger btn-sm float-right"
                                    onClick={this.handleOnclickDelete.bind(
                                      this,
                                      item.TenFilm
                                    )}
                                  >
                                    <i className="fas fa-trash float-right"></i>
                                    Delete
                                  </button>
                                  <div>
                                    <div className="carousel-inner">
                                      <div className="carousel-item carousel-item-next carousel-item-left">
                                        <a
                                          href="/updatefilm"
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
                                  <button
                                    className="btn btn-danger btn-sm float-right"
                                    onClick={this.handleOnclickDelete.bind(
                                      this,
                                      item.TenFilm
                                    )}
                                  >
                                    <i className="fas fa-trash float-right"></i>
                                    Delete
                                  </button>
                                  <div>
                                    <div className="carousel-inner">
                                      <div className="carousel-item carousel-item-next carousel-item-left">
                                        <a
                                          href="/updatefilm"
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
