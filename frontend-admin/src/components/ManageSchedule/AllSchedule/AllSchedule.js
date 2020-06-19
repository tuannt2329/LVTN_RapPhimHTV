import React, { Component } from "react";
import Menu from "../../Menu/Menu";
import Modal from "./ModalDetail";
import ModalAdd from './ModalAddSchedule';
// import { Modal, Button } from "react-bootstrap";

import axios from "axios";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
import {
  Calendar,
  dateFnsLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// const locales = {
//   "en-US": require("date-fns/locale/en-US"),
// };
import moment from "moment";
const localizer = momentLocalizer(moment);
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });
// const events = [
// {
//   "title": "All Day Event",
//   "allDay": true,
//   "start": new Date(2020, 6, 17),
//   "end": new Date(2020, 6, 20),
// },
// {
//   "title": "All Day Event",
//   "allDay": false,
//   "start": new Date("2020-06-13T17:51:00"),
//   "end": new Date("2020-06-13T19:51:00"),
// },
// ];
class AllFilms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
      events: [],
      isOpen: false,
      isOpenAdd: false,
      eventInfo: null,
    };
  }

  handle = () => {
    if (this.state.films.length > 0 || this.state.films !== "undefined") {
      this.state.films.map((val) => {
        this.setState({
          events: [
            ...this.state.events,
            {
              title: val.TenFilm,
              start: new Date(val.ThoiGianChieu.split(".")[0]),
              end: new Date(val.ThoiGianKetThuc.split(".")[0]),
              resourceId: val.TenFilm + val.TenPhong,
              id: val,
            },
          ],
        });
      });
    }
  };

  clickEvent = (id) => {
    this.setState({
      eventInfo: id,
      isOpen: !this.state.isOpen,
    });
  };
  clickEventAdd = (e) => {
    var cDate = ''
    if (e)
    cDate = new Date(e.slots[0]);
    this.setState({
      isOpenAdd: !this.state.isOpenAdd,
      clickDate: cDate
    });
  };
  UNSAFE_componentWillMount() {
    this.isLocalStorage();
    axios.post("http://htvcinemas.live:8000/schedule/find").then(async (res) => {
      await this.setStateFilms(res.data.schedule);
      this.handle();
    });
  }

  setStateFilms = (data) => {
    this.setState({ films: data }, () => {
      console.log("update xong", this.state.films);
    });
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

  handleOnClickThemLich = (tenphim) => {
    sessionStorage.setItem("tenphim", tenphim);
    return (window.location = "/addshedule");
  };

  render() {
    return (
      <div>
        <Menu />
        {this.state.isOpen === true ? (
          <Modal
            show={this.state.isOpen}
            eventInfo={this.state.eventInfo}
            clickEvent={() => this.clickEvent()}
          ></Modal>
        ) : null}
        {this.state.isOpenAdd === true ? (
          <ModalAdd
            date={this.state.clickDate}
            show={this.state.isOpenAdd}
            clickEvent={() => this.clickEventAdd()}
          ></ModalAdd>
        ) : null}
        {/* <Modal show={this.state.isOpen} onHide={() => this.clickEvent(1,1)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button variant="secondary" onClick={() => this.clickEvent(1,2)}>
                Close
              </Button>
              Woohoo, you're reading this text in a modal!
              Woohoo, you're reading this text in a modal!
              {this.state.eventInfo ? this.state.eventInfo : 'khong co'}
            </Modal.Body>
            <Modal.Footer>
        
            </Modal.Footer>
          </Modal> */}

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

              <div className="row-12">
                <Calendar
                  localizer={localizer}
                  selectable
                  popup
                  startAccessor="start"
                  endAccessor="end"
                  events={this.state.events}
                  // xu ly khi nhan vao event
                  onSelectEvent={(event) => {
                    // alert(`Ngay da duoc click ${event.id}`);
                    this.clickEvent(event.id);
                  }}
                  // xu ly khi nhan vao blank space
                    onSelectSlot={(event) => {
                      this.clickEventAdd(event);
                      // alert('a', start)
                    }}
                  style={{ height: 500 }}
                />

                {/* <Calendar></Calendar> */}
                {/* <ScheduleComponent currentView='Month'>
                      <Inject services={[Day, Week, WorkWeek, Month, Agenda
                    ]}></Inject>
                  </ScheduleComponent> */}

                {/* {this.state.films.map((item, index) =>
                  (Date.parse(item["NgayChieu"]) <= Date.parse(Date()) &&
                    Date.parse(Date()) < Date.parse(item["NgayKetThuc"])) ||
                  Date.parse(item["NgayChieu"]) > Date.parse(Date()) ? (
                    index === 0 ? (
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <button
                              className="btn btn-success btn-sm float-right"
                              onClick={this.handleOnClickThemLich.bind(
                                this,
                                item.TenFilm
                              )}
                            >
                              <i className="fas fa-add float-right"></i>Thêm
                              lịch chiếu
                            </button>
                            <div>
                              <div className="carousel-inner">
                                <div className="carousel-item carousel-item-next carousel-item-left">
                                  <a
                                    href="/detailshedule"
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
                              className="btn btn-success btn-sm float-right"
                              onClick={this.handleOnClickThemLich.bind(
                                this,
                                item.TenFilm
                              )}
                            >
                              <i className="fas fa-add float-right"></i>Thêm
                              lịch chiếu
                            </button>
                            <div>
                              <div className="carousel-inner">
                                <div className="carousel-item carousel-item-next carousel-item-left">
                                  <a
                                    href="/detailshedule"
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
                  ) : null
                )} */}
              </div>
              <div className="row"></div>
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
