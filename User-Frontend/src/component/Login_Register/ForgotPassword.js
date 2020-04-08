import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
  
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangeMXN = this.onChangeMXN.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangePasswordConf = this.onChangePasswordConf.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
    this.onSendEmail = this.onSendEmail.bind(this)
    this.onResetForm = this.onResetForm.bind(this)
    this.state = {
      email: '',
      maxacnhan: '',
      password: '',
      passwordConf: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.password, " : ", this.state.passwordConf)
    if(this.state.password === this.state.passwordConf) {
      const account = {
        email: this.state.email,
        password: this.state.password,
        verificationCode: this.state.maxacnhan
      }
    
      axios.put('http://localhost:8000/user/updateInfo', account)
      .then((res) => {
        if (!res.data.error) {
          window.alert(res.data.content)
          return window.location.reload()
        } else {
          window.alert(res.data.error)
        }
      })
    } else {
      window.alert("Mật khẩu không khớp. Vui lòng nhập lại!")
    }
  
    // this.setState({
    //   email: "",
    //   password: ""
    // })
    }
  
  onSendEmail = (e) => {
    e.preventDefault();
    
    const email = {
      email: this.state.email
    }

    axios.post('http://localhost:8000/user/verification', email)
    .then((res) => {
      if (res.data.error) {
        window.alert(res.data.error)
      } else {
        window.alert(res.data.info)
      }
    })
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  
  onChangeMXN = (e) => {
    this.setState({
      maxacnhan: e.target.value
    })
  }

  onChangePassword = (password) => {
    this.setState({
      password: password.target.value
    })
  }
    
  onChangePasswordConf = (passwordConf) => {
    this.setState({
        passwordConf: passwordConf.target.value
    });
  }

  onResetForm = () => {
    this.setState({
      ...this.state,
      email: '',
      password: '',
      submit: false
    })
  }
  render() {
    return (
      <div className="modal-dialog">
        <div className="modal-outer-container">
          <div className="modal-middle-container">
            <div className="login-wrapper animated slideInDown">
              <div className="login-container">
                <button type="button" className="close" id="closelogin" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <div className="tab-login-line">
                  <div className="tab-login-title">Quên mật khẩu</div>
                  <div className="login-tab-wrapper">
                    <div className="login-heading">
                      <div className="text-heading">
                        <span className="sub-text">Vui lòng cung cấp email đăng nhập,
                  chúng tôi sẽ gửi mã kích hoạt cho bạn.</span>
                      </div>
                    </div>
                    <form className="login-form">

                      <div className="row captcha">
                        <div className="col-md-10 col-sm-10 col-xs-4 first-col">
                          <input placeholder="Nhập email của bạn" type="email"
                            required="required" className="login" 
                            value={this.state.email}
                            onChange={this.onChangeEmail}/>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-8 second-col">
                          <htv-captcha>
                            <div className="send-email">
                              <button onClick={this.onSendEmail}>
                                <img src="htv/website/images/sendEmail.png"
                                  alt="imageSendEmail"
                                  className="img-send-email" />
                              </button>
                            </div>
                          </htv-captcha>
                        </div>
                      </div>

                      <input placeholder="Mã xác nhận" type="text" required="required"
                        className="login" value={this.state.maxacnhan}
                        onChange={this.onChangeMXN}/>

                      <input placeholder="Nhập mật khẩu mới" type="password" required="required"
                        className="login" value={this.state.password}
                        onChange={this.onChangePassword}/>
                      
                      <input placeholder="Xác nhận mật khẩu" type="password" required="required"
                        className="login" value={this.state.passwordConf}
                        onChange={this.onChangePasswordConf}/>
                      <button className="btn primary input" onClick={this.onSubmit}>
                        <i className="fa fa-pulse fa-spinner" />Cấp lại mật khẩu</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    );
  }
}
export default ForgotPassword;