import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
class ForgotPassword extends React.Component {

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
                                                    <input placeholder="Nhập email của bạn" type="text"
                                                        required="required" className="login" />
                                                </div>
                                                <div className="col-md-2 col-sm-2 col-xs-8 second-col">
                                                    <htv-captcha>
                                                        <div className="send-email">
                                                            <a href="/">
                                                                <img src="htv/website/images/sendEmail.png"
                                                                    alt="imageSendEmail"
                                                                    className="img-send-email" />
                                                            </a>
                                                        </div>
                                                    </htv-captcha>
                                                </div>
                                            </div>

                                            <input placeholder="Nhập mật khẩu mới" type="password" required="required"
                                                className="login" />
                                            <button className="btn primary input">
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