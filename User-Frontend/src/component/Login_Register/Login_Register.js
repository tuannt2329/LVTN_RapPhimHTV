import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
class Login_Register extends React.Component {
  constructor(props) {
    super(props)

    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onResetForm = this.onResetForm.bind(this)
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.state = {
      email: '',
      password: '',
      submit: false
    }
  }

  UNSAFE_componentWillMount() {
    this.handleLoginSuccess()
  }

  handleLoginSuccess = () => {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      const user = JSON.parse(localStorage.getItem('user'))
      const fullname = user["lastName"] + ' ' + user["firstName"]
      this.setState({ submit: true, fullname: fullname })
    }
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword = (password) => {
    this.setState({
      password: password.target.value
    })
  }

  onResetForm = () => {
    this.setState({
      ...this.state,
      email: '',
      password: '',
      submit: false
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const account = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:8000/user/login', account)
      .then((res) => {
        if (!res.data.error) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          this.handleLoginSuccess()
          return window.location.reload()

        } else {
          window.alert(res.data.error)
        }
      })

    // this.setState({
    //   email: "",
    //   password: ""
    // })
  }

  onLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("user")
    this.onResetForm()
    return window.location = '/'
  }

  render() {
    return (
      <div className="secondary-nav-wrapper">
        <ul className="secondary-nav">
          {!this.state.submit ? (
            <li>
              <a id="loginLink" href="#" data-toggle="modal" data-target="#myModal">
                <i className="fa fa-user" />
            Đăng nhập</a>
            </li>
          ) : (
              <li>
                <a href="/"
                  data-toggle="dropdown" className="dropdown-toggle ng-scope" >
                  <i className="icon-member" />
                  <span className="ng-binding">{this.state.fullname}</span>
                </a>
                <span>|</span>
                <a href="/" onClick={this.onLogout}>Đăng xuất</a>
              </li>
            )}
          {/* <li className="language hidden-xs">
            <a href="/" className="active">VN</a>
            <span>|</span>
            <a href="/en/">EN</a>
          </li> */}
        </ul>
        {/* Modal Đăng nhập, Đăng ký */}
        <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">

          <div className="modal-dialog">
            <div className="modal-outer-container">
              <div className="modal-middle-container">
                <div className="login-wrapper animated slideInDown">
                  <div className="login-container">
                    <button type="button" className="close" id="closelogin" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>

                    <div className="tab-login-line">
                      <ul className="nav nav-tabs">
                        <li className="active">
                          <a id="a_tab_login_1" href="#tab_login_1" data-toggle="tab">Đăng nhập</a>
                        </li>
                        <li>
                          <a className="line">/</a>
                        </li>
                        <li>
                          <a id="a_tab_login_2" href="#tab_login_2" data-toggle="tab">Đăng ký</a>
                        </li>
                      </ul>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="tab-content">
                            {/* Đăng nhập */}
                            <div id="tab_login_1" className="tab-pane active">
                              <div className="login-tab-wrapper">
                                <div className="login-heading">
                                  <div className="text-heading">
                                    <span className="sub-text">
                                      Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội
                                      nhận thêm nhiều ưu đãi từ chương trình thành viên HTV Cinema.</span>
                                  </div>
                                </div>
                                <form className="login-form" onSubmit={this.onSubmit}>
                                  <input placeholder="Email" type="email" required="required"
                                    value={this.state.email} onChange={this.onChangeEmail}
                                    name="email" className="login"
                                  />
                                  <input placeholder="Mật khẩu" type="password" required="required"
                                    value={this.state.password} onChange={this.onChangePassword}
                                    name="password" className="login"
                                  />
                                  <div className="login-remember">
                                    <div className="forget-pass">
                                      <a id="forgetPass" href="#" data-dismiss="modal" data-toggle="modal" 
                                      data-target="#myModalForgetPassword" >Quên mật khẩu?</a>

                                    </div>
                                  </div>
                                  <button className="btn primary input" type="submit" data-backdrop="false">
                                    <i className="fa fa-pulse fa-spinner" /> Đăng nhập
                                    </button>
                                </form>
                              </div>
                            </div>

                            {/* Đăng ký */}
                            <div id="tab_login_2" className="tab-pane">
                              <div className="login-tab-wrapper">
                                <div className="login-form">
                                  <form>
                                    <div className="row city">
                                      <div className="col-md-6 col-sm-6 col-xs-6 first-col">
                                        <input type="text" placeholder="Họ" required="required"
                                          className="login" />
                                      </div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 second-col">
                                        <input type="text" placeholder="Tên"
                                          required="required" className="login" /></div>
                                    </div>

                                    <div className="row city">
                                      <div className="col-md-6 col-sm-6 col-xs-6 first-col">
                                        <input type="email" placeholder="Email" required="required"
                                          className="login register-input remove-mb" />
                                      </div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 second-col">
                                        <input type="password" placeholder="Mật khẩu" required="required"
                                          className="login" />
                                      </div>

                                    </div>
                                    <div className="row city">
                                      <div className="col-md-6 col-sm-6 col-xs-6 first-col">
                                        <htv-select >
                                          <input type="password" placeholder="Xác nhận mật khẩu"
                                            required="required" className="login " />
                                        </htv-select>
                                      </div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 second-col register_gioitinh">
                                        <htv-select>
                                          <div className="btn-select-sex login location">
                                            <select id="sex">
                                              <option value="" disabled selected>Chọn giới tính</option>
                                              <option value="number:0">Nam</option>
                                              <option value="Nữ">Nữ</option>
                                              <option value="Khác">Khác</option>
                                            </select>
                                          </div>
                                        </htv-select>
                                      </div>
                                    </div>

                                    <p className="text-confirm-signup">Tôi đã đọc và đồng ý với&nbsp;
                                            <b>Điều khoản&nbsp;</b>
                                          của chương trình.&nbsp;</p><br />
                                    <button className="btn primary input">
                                      <i className="fa fa-pulse fa-spinner" />Đăng ký</button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>




          {/* Modal Đăng ký thành công */}
          <div id="success-modal" style={{ zIndex: 1111 }} className="modal fade">
            <div className="modal-dialog">
              <div className="modal-outer-container">
                <div className="modal-middle-container">
                  <div className="login-wrapper animated slideInDown">
                    <div className="login-container">
                      <span className="close">
                        <i className="icon-cancel" />
                      </span>
                      <div className="tab-login-line">
                        <div className="tab-login-title">Đăng ký thành công</div>
                        <div className="login-tab-wrapper">
                          <div className="login-heading success">
                            <i className="icon-success" />
                            <div className="text-heading">
                              <span className="sub-text">Bạn vui lòng truy cập email để kích hoạt tài khoản.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* Modal quên mật khẩu */}
        <div className="modal fade" id="myModalForgetPassword" tabIndex={-1} role="dialog"
          aria-labelledby="myModalLabel" aria-hidden="true">
          <ForgotPassword />
        </div>
        
      </div>
    );
  }
}
export default Login_Register;