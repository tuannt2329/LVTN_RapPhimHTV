import React from "react";
import { Modal, Button } from "react-bootstrap";
import Add from "../AddShedule/AddShedule";
import moment from "moment";

import axios from "axios";

class ModalDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      Film: [this.props.eventInfo],
    };
    console.log("event info", this.props.eventInfo);
    this.onChangeGioChieu = this.onChangeGioChieu.bind(this);
    this.onChangePhongChieu = this.onChangePhongChieu.bind(this);
    this.onChangeGioKetThuc = this.onChangeGioKetThuc.bind(this);
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      show: nextProps.show,
    };
  }
  handleClose = (event) => {
    console.log("chay cai ham handle close");
    this.setState({
      show: false,
    });
  };
  setStateFilms = (Film) => {
    this.setState({ Film });
  };

  onChangePhongChieu = (e) => {
    var film = this.state.Film;
    film[e.target.id]["TenPhong"] = e.target.value;
    this.setState({
      Film: film,
    });
  };

  onChangeNgayChieu = (e) => {
    var film = this.state.Film;
    film[e.target.id]["ThoiGianChieu"] =
      e.target.value +
      "T" +
      this.state.Film[e.target.id]["ThoiGianChieu"].split("T")[1];
    this.setState({
      Film: film,
    });
  };

  onChangeGioChieu = (e) => {
    var film = this.state.Film;
    film[e.target.id]["ThoiGianChieu"] =
      this.state.Film[e.target.id]["ThoiGianChieu"].split("T")[0] +
      "T" +
      e.target.value +
      ":00.000Z";
    this.setState({
      Film: film,
    });
  };

  onChangeGioKetThuc = (e) => {
    var film = this.state.Film;
    film[e.target.id]["ThoiGianKetThuc"] =
      this.state.Film[e.target.id]["ThoiGianKetThuc"].split("T")[0] +
      "T" +
      e.target.value +
      ":00.000Z";
    this.setState({
      Film: film,
    });
  };

  onSubmit = (e) => {
    if (window.confirm("Do you really want to update?")) {
      e.preventDefault();
      let count = 0;
      this.state.Film.map(async (item) => {
        const film = item;
        await axios
          .put("http://localhost:8000/schedule/updateSchedule", film)
          .then((res) => {
            if (!res.data.error) {
              count++;
            } else {
              return window.alert(res.data.error);
            }
          });
        if (count === this.state.Film.length) {
          window.alert("update shedule success!");
          return window.location.reload();
        }
      });
    }
  };

  handleOnclickDelete = (film) => {
    if (window.confirm("Do you really want to delete?")) {
      var film = film;
      axios
        .put("http://localhost:8000/schedule/deleteSchedule", film)
        .then((res) => {
          if (!res.data.error) {
            console.log(res.data);
            axios
              .put("http://localhost:8000/ghe/updateStatus", film)
              .then((res1) => {
                console.log(res1.data);
                if (!res1.data.error) {
                  window.alert("delete successfull !!!");
                  window.location.reload();
                } else {
                  window.alert(res1.error);
                }
              });
          }
        });
    }
  };
  render() {
    // Render nothing if the "show" prop is false
    if (!this.state.show) {
      return null;
    } else {
      return (
        <div>
          <Modal
            size="lg"
            show={this.state.show}
            onHide={() => this.props.clickEvent()}
          >
            <Modal.Header closeButton>
              <Modal.Title>Chi tiết lịch chiếu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <Button variant="secondary" onClick={() => this.handleClose()}>
                Close
              </Button>
              Woohoo, you're reading this text in a modal!{" "} */}
              <section className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-9 mx-auto d-block">
                      <div className="card">
                        <div className="card-header p-2">
                          <ul className="nav nav-pills">
                            <li className="nav-item">
                              <a className="nav-link" href="" data-toggle="tab">
                                Thông tin lịch chiếu
                              </a>
                            </li>
                          </ul>
                        </div>
                        {this.state.Film.map((item, index) => (
                          <div className="card-body">
                            <div className="tab-content">
                              <div className="active tab-pane" id="settings">
                                <button
                                  className="btn btn-danger float-right"
                                  onClick={this.handleOnclickDelete.bind(
                                    this,
                                    item
                                  )}
                                >
                                  <i className="fas fa-trash float-right"></i>
                                  Delete
                                </button>
                                <form
                                  className="form-horizontal"
                                  onSubmit={this.onSubmit.bind(this)}
                                >
                                  <div className="form-group row">
                                    <label
                                      htmlFor="inputFilmName"
                                      className="col-sm-2 col-form-label"
                                    >
                                      Tên phim
                                    </label>
                                    <div className="col-sm-10">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="inputFilmName"
                                        placeholder="Tên phim"
                                        defaultValue={item["TenFilm"]}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label
                                      htmlFor="inputName"
                                      className="col-sm-2 col-form-label"
                                    >
                                      Phòng chiếu
                                    </label>
                                    <div className="col-sm-10">
                                      <input
                                        type="number"
                                        min="1"
                                        max="7"
                                        className="form-control"
                                        id={index}
                                        placeholder="Phòng chiếu"
                                        defaultValue={item["TenPhong"]}
                                        onChange={this.onChangePhongChieu}
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group row">
                                    <label
                                      htmlFor="inputSkills"
                                      className="col-sm-2 col-form-label"
                                    >
                                      Ngày chiếu
                                    </label>
                                    <div className="col-sm-10">
                                      <input
                                        type="date"
                                        className="form-control"
                                        id={index}
                                        defaultValue={
                                          item["ThoiGianChieu"]
                                            ? item["ThoiGianChieu"].split(
                                                "T"
                                              )[0]
                                            : null
                                        }
                                        onChange={this.onChangeNgayChieu.bind(
                                          this
                                        )}
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group row">
                                    <label
                                      htmlFor="inputSkills"
                                      className="col-sm-2 col-form-label"
                                    >
                                      Giờ chiếu
                                    </label>
                                    <div className="col-sm-10">
                                      <input
                                        type="time"
                                        className="form-control"
                                        id={index}
                                        defaultValue={
                                          item["ThoiGianChieu"]
                                            ? item["ThoiGianChieu"]
                                                .split("T")[1]
                                                .split(":00.")[0]
                                            : null
                                        }
                                        onChange={this.onChangeGioChieu}
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group row">
                                    <label
                                      htmlFor="inputSkills"
                                      className="col-sm-2 col-form-label"
                                    >
                                      Thời gian kết thúc
                                    </label>
                                    <div className="col-sm-10">
                                      <input
                                        type="time"
                                        className="form-control"
                                        id={index}
                                        defaultValue={
                                          item["ThoiGianKetThuc"]
                                            ? item["ThoiGianKetThuc"]
                                                .split("T")[1]
                                                .split(":00.")[0]
                                            : null
                                        }
                                        onChange={this.onChangeGioKetThuc}
                                      />
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-12">
                                      <a
                                        href="/allfilmsshedule"
                                        className="btn btn-secondary"
                                      >
                                        Cancel
                                      </a>
                                      <button
                                        type="submit"
                                        className="btn btn-success float-right"
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={(event) => this.handleClose(event)}>
              Close
            </Button> */}
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
}

export default ModalDetail;
