import React, { Component } from "react";
import Menu from "../../Menu/Menu";
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      admin: [],
    };
  }

  componentDidMount() {}
  UNSAFE_componentWillMount() {
    this.isLocalStorage();
    axios.post("http://htvcinemas.live:8000/user/find").then((res) => {
      this.setStateFilms(res.data.user);
    });
  }

  setStateFilms = (data) => {
    this.setState({
      admin: data.filter((a) => a.role === "admin"),
      users: data.filter((b) => b.role === "user"),
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

  handleOnclickUser = (email) => {
    sessionStorage.setItem("email", email);
  };

  handleOnclickDelete = (email) => {
    if (window.confirm("Do you really want to delete?")) {
      var email = { email: email };
      axios.put("http://htvcinemas.live:8000/user/deleteuser", email).then((res) => {
        window.location.reload();
      });
    }
  };

  render() {
    return (
      <div>
        <Menu />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>All Users</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/menu">Home</a>
                    </li>
                    <li className="breadcrumb-item active">AllUsers</li>
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
                    <Tab eventKey="home" title="ADMIN">
                      <div className="row">
                        {this.state.admin.map((item, index) => (
                          <div className="col-md-6">
                            <div className="card">
                              <div className="card-body">
                                <button
                                  className="btn btn-danger btn-sm float-right"
                                  onClick={this.handleOnclickDelete.bind(
                                    this,
                                    item.email
                                  )}
                                >
                                  <i className="fas fa-trash float-right"></i>
                                  Delete
                                </button>
                                <div>
                                  <div className="carousel-inner">
                                    <div className="carousel-item carousel-item-next carousel-item-left">
                                      <table>
                                        <tr>
                                          <td>
                                            <a
                                              href="/updateuser"
                                              onClick={this.handleOnclickUser.bind(
                                                this,
                                                item.email
                                              )}
                                            >
                                              <center>
                                                <dt>{item.email}</dt>
                                              </center>
                                            </a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a
                                              href="/updateuser"
                                              onClick={this.handleOnclickUser.bind(
                                                this,
                                                item.email
                                              )}
                                            >
                                              {/* <center>
                                                <dt>{item.role}</dt>
                                              </center> */}
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Tab>
                    <Tab eventKey="profile" title="USER">
                      <div className="row">
                        {this.state.users.map((item, index) => (
                          <div className="col-md-6">
                            <div className="card card-block ">
                              <div className="card-body ">
                                <button
                                  className="btn btn-danger btn-sm float-right"
                                  onClick={this.handleOnclickDelete.bind(
                                    this,
                                    item.email
                                  )}
                                >
                                  <i className="fas fa-trash float-right"></i>
                                  Delete
                                </button>
                                <div>
                                  <div className="carousel-inner">
                                    <div className="carousel-item carousel-item-next carousel-item-left">
                                      <table>
                                        <tr>
                                          <td>
                                            <a
                                              href="/updateuser"
                                              onClick={this.handleOnclickUser.bind(
                                                this,
                                                item.email
                                              )}
                                            >
                                              <center>
                                                <dt>{item.email}</dt>
                                              </center>
                                            </a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <a
                                              href="/updateuser"
                                              onClick={this.handleOnclickUser.bind(
                                                this,
                                                item.email
                                              )}
                                            >
                                              {/* <center>
                                                <dt>{item.role}</dt>
                                              </center> */}
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Tab>
                  </Tabs>
                </div>

                {/* {this.state.users.map((item, index) => (
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <button
                          className="btn btn-danger btn-sm float-right"
                          onClick={this.handleOnclickDelete.bind(
                            this,
                            item.email
                          )}
                        >
                          <i className="fas fa-trash float-right"></i>Delete
                        </button>
                        <div>
                          <div className="carousel-inner">
                            <div className="carousel-item carousel-item-next carousel-item-left">
                              <table>
                                <tr>
                                  <td>
                                    <a
                                      href="/updateuser"
                                      onClick={this.handleOnclickUser.bind(
                                        this,
                                        item.email
                                      )}
                                    >
                                      <center>
                                        <dt>{item.email}</dt>
                                      </center>
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <a
                                      href="/updateuser"
                                      onClick={this.handleOnclickUser.bind(
                                        this,
                                        item.email
                                      )}
                                    >
                                      <center>
                                        <dt>{item.role}</dt>
                                      </center>
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
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

export default AllUsers;
