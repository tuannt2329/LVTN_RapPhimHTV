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
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangegender = this.onChangegender.bind(this);
  }

  UNSAFE_componentWillMount() {
    var email = {email: JSON.parse(localStorage.getItem('user')).email}
    axios.post("http://htvcinemas.live:8000/user/find", email)
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

  onChangeNewPassword = (e) => {
    var User = this.state.User;
    User["newPassword"] = e.target.value;
    this.setState({
      User: User
    });
  }

  onChangeNewPasswordConfirm = (e) => {
    var User = this.state.User;
    User["newPasswordConfirm"] = e.target.value;
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

  onSubmit = (e) => {
    e.preventDefault();

    const User = this.state.User;
    axios.put('http://htvcinemas.live:8000/user/updateInfo', User)
      .then((res) => {
        if (!res.data.error) {
          localStorage.setItem("user", JSON.stringify(this.state.User))
          window.alert("update info user success!")
          return window.location.reload()
        } else {
          return window.alert(res.data.error)
        }
      });
  }

  onSubmitNewPassword = (e) => {
    e.preventDefault();

    let account = {
      email: this.state.User.email,
      password: this.state.User.password
    }
    let accountChangpassword = {
      email: this.state.User.email,
      password: this.state.User.newPassword,
      firstName: this.state.User.firstName,
      lastName: this.state.User.lastName
    }
    if (this.state.User.newPassword === this.state.User.newPasswordConfirm) {
      axios.post('http://htvcinemas.live:8000/user/login', account)
        .then((res) => {
          if (!res.data.error) {
            axios.put('http://htvcinemas.live:8000/user/updateInfo', accountChangpassword)
                  .then((res) => {
                    if (!res.data.error) {
                      window.alert("update password success!")
                      localStorage.removeItem('user')
                      return window.location = '/'
                    } else {
                      return window.alert(res.data.error)
                    }
                  });
          } else {
            window.alert(res.data.error)
          }
        })
    } else {
      return window.alert("mật khẩu xác nhận không khớp")
    }
    
  }

  render() {
    console.log(this.state.User)
    if (this.state.User) {
      return (
        <div className="block-wrapper">
          <div className="container">
            <div className="row">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
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
                        <li><a href="#tab_exchange" data-toggle="tab">Đổi mật khẩu</a>
                        </li>
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
                          <form className="member-form" onSubmit={this.onSubmitNewPassword.bind(this)}>
                            <div className="row row-info">
                              <div className="col-md-5 col-sm-7 col-xs-7">
                                <label>Email</label>
                                <button type="button"
                                  defaultValue={this.state.User["email"]}
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title className="btn btn-email">{this.state.User["email"]}</button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-5 col-sm-7 col-xs-7">
                                <label>Mật khẩu cũ</label>
                                <input id="address"
                                  placeholder="Mật khẩu cũ" type="password"
                                  className="login"
                                  onChange={this.onChangePassword}
                                  required
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-5 col-sm-7 col-xs-7">
                                <label>Mật khẩu mới</label>
                                <input id="address"
                                  placeholder="Mật khẩu mới" type="password"
                                  className="login"
                                  onChange={this.onChangeNewPassword}
                                  required
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-5 col-sm-7 col-xs-7">
                                <label>Nhập lại mật khẩu mới</label>
                                <input id="address"
                                  placeholder="Nhập lại mật khẩu mới" type="password"
                                  className="login"
                                  onChange={this.onChangeNewPasswordConfirm}
                                  required
                                />
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