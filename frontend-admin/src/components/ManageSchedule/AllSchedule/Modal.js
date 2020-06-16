import React from "react";
import { Modal, Button } from "react-bootstrap";
import Add from "../AddShedule/AddShedule";
import moment from "moment";
class Modall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
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
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button variant="secondary" onClick={() => this.handleClose()}>
                Close
              </Button>
              Woohoo, you're reading this text in a modal!{" "}
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
                        {/* /.card-header */}
                        <div className="card-body">
                          <div className="tab-content">
                            <div className="active tab-pane" id="settings">
                              <form className="form-horizontal">
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
                                      placeholder={this.props.eventInfo.TenFilm}
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
                                      type="text"
                                      // min="1"
                                      // max="7"
                                      className="form-control"
                                      // id="{index}a"
                                      // defaultValue={this.props.clickEvent.PhongChieu}
                                      placeholder={this.props.eventInfo.TenPhong}
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
                                      type="text"
                                      className="form-control"
                                      placeholder= {moment(this.props.eventInfo.ThoiGianChieu.split('T')[0].slice(0,10)).format('DD-MM-YYYY')}

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
                                      id="abc"
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
                                      id="abc"
                                    />
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
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

export default Modall;
