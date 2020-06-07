import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
class UpdateInfoUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      User: null,
      gender: null,
    }
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangegender = this.onChangegender.bind(this);
  }

  UNSAFE_componentWillMount() {
    var email = {email: JSON.parse(localStorage.getItem('user')).email}
    axios.post("http://conallserver.ddns.net:8000/user/find", email)
      .then((res) => {
        this.setStateUsers(res.data.user[0]);
        this.setState({
          gender: res.data.user[0].gender
        });
      });
  }

  setStateUsers = (User) => {
    this.setState({ User });
  }

  onChangePassword = (e) => {
    var User = this.state.User;
    User["password"] = e.target.value;
    this.setState({
      User: User
    });
  }

  onChangeFirstName = (e) => {
    var User = this.state.User;
    User["firstName"] = e.target.value;
    this.setState({
      User: User
    });
  }

  onChangeLastName = (e) => {
    var User = this.state.User;
    User["lastName"] = e.target.value;
    this.setState({
      User: User
    });
  }

  onChangegender = (e) => {
    var User = this.state.User;
    User["gender"] = e.target.value;
    this.setState({
      gender: e.target.value,
    });
    this.setState({
      User: User
    });
  }

  // onChangerole = (e) => {
  //   var User = this.state.User;
  //   User["role"] = e.target.value;
  //   this.setState({
  //     User: User
  //   });
  // }


  onSubmit = (e) => {
    e.preventDefault();

    const User = this.state.User;
    axios.put('http://conallserver.ddns.net:8000/user/updateInfo', User)
      .then((res) => {
        if (!res.data.error) {
          window.alert("update info user success!")
          return window.location.reload()
        } else {
          return window.alert(res.data.error)
        }
      });
  }

  render() {
    if (this.state.User) {
      return (
        <div className="block-wrapper">
          <div className="container">
            <div className="row">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Trang chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Thành viên</a>
                </li>
                <li className="breadcrumb-item active">Cá nhân</li>
              </ol>
            </div><div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="content-wrapper">
                  <div className="tab-movies tab-crm">
                    <div className="tab-movies-line">
                      <ul className="nav nav-tabs">
                        <li className="active">
                          <a href="#tab_info" data-toggle="tab">Thông tin thành viên</a>
                        </li>
                        {/* <li><a href="#tab_exchange" data-toggle="tab">Giao dịch của tôi</a>
                        </li> */}
                      </ul>
                      <div className="tab-content">
                        <div id="tab_info" className="tab-pane active">
                          <form className="member-form" onSubmit={this.onSubmit.bind(this)}>
                            <div className="row row-info">
                              <div className="col-md-5 col-sm-7 col-xs-7">
                                <label>Email</label>
                                <button type="button"
                                  defaultValue={this.state.User["email"]}
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title className="btn btn-email">{this.state.User["email"]}</button>
                              </div>

                              <div className="col-md-5 col-sm-5 col-xs-5">
                                <label>Họ</label>
                                <input id="address"
                                  placeholder="Họ" type="text"
                                  className="login"
                                  defaultValue={this.state.User["firstName"]} onChange={this.onChangeFirstName}
                                />
                              </div>
                            </div>

                            <div className="row">
                              {/* <div className="col-md-5 col-sm-7 col-xs-7">
                                <label>Mật khẩu</label>
                                <input id="address"
                                  placeholder="Mật khẩu" type="password"
                                  className="login"
                                  // defaultValue={this.state.User["password"]}
                                  onChange={this.onChangePassword}
                                />
                              </div> */}
                              <div className="col-md-5 col-sm-5 col-xs-5">
                                <label>Tên</label>
                                <input id="address"
                                  placeholder="Tên" type="text"
                                  className="login"
                                  defaultValue={this.state.User["lastName"]} onChange={this.onChangeLastName}
                                />
                              </div>


                            </div>
                            <div className="row row-info">

                              <div className="col-md-2 col-sm-4 col-xs-4">
                                <div className="btn-select-sex login location">
                                  {/* <input type="text" className="form-control" id="inputName2" 
                                  placeholder="gender" defaultValue={this.state.User["gender"]} 
                                  onChange={this.onChangegender} /> */}
                                  <select id="sex"
                                    // placeholder={this.state.gender}
                                    value={this.state.gender}
                                    onChange={this.onChangegender}>
                                    {/* <option disabled selected >{this.state.User["gender"]}</option> */}
                                    <option value="male">Nam</option>
                                 
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="row row-info">
                              <div className="col-md-12">
                                <button type="submit" id="save" className="btn primary btn-login-buyticket">
                                  <i className="fa fa-pulse fa-spinner" />Lưu lại</button>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div id="tab_exchange" className="tab-pane">
                          <form className="member-form">
                            <div className="row">

                            </div>
                            <div className="row">

                            </div>
                          </form>

                          <div id="gift-detail" className="row">
                            <section className="detail-feature transaction-detail">

                            </section>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="table-responsive">
                              </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 pull-right">
                              <a className="btn secondary fl-right member-btn-history">Xem lại lịch sử giao dịch</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-12 col-sm-12 col-xs-12">
                <section>
                  <a href="/phim-dang-chieu" className="title-block">
                    <h3>Phim đang chiếu </h3>
                  </a>
                </section>
              </div> */}
            </div>
            <div className="row">
              <div className="col-md-12 col-xs-12" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>ss</div>
    );
  }
}
export default UpdateInfoUser;