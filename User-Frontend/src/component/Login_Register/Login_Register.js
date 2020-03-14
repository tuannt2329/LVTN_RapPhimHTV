import React from 'react';
class Login_Register extends React.Component {
    render() {
        return (
            <div className="secondary-nav-wrapper">
                <ul className="secondary-nav">
                    <li>
                        <a id="loginLink" href="#" data-toggle="modal" data-target="#myModal">
                            <i class="fa fa-user" />
                        Đăng nhập</a>
                    </li>
                    <li className="language hidden-xs">
                        <a href="/" className="active">VN</a>
                        <span>|</span>
                        <a href="/en/">EN</a>
                    </li>
                </ul>

                {/* Modal Đăng nhập, Đăng ký */}
                <div className="modal fade" id="myModal">
                    <div id="login-modal" className="modal fade in" style={{ display: 'block', paddingLeft: '0px' }}>
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
                                                                    <form className="login-form">
                                                                        <input placeholder="Email" type="email" required="required"
                                                                            className="login" />
                                                                        <input placeholder="Mật khẩu" type="password" required="required"
                                                                            className="login" />
                                                                        <div className="login-remember">
                                                                            <div className="forget-pass">
                                                                                <a id="forgetPass" href >Quên mật khẩu?</a>
                                                                            </div>
                                                                        </div>
                                                                        <button className="btn primary input">
                                                                            <i className="fa fa-pulse fa-spinner" />Đăng nhập</button>
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
                                                                                    <input type="password" placeholder="Mật khẩu" ng-model="user.password" required="required"
                                                                                        className="login" />
                                                                                </div>

                                                                            </div>
                                                                            <div className="row city">
                                                                                <div className="col-md-6 col-sm-6 col-xs-6 first-col">
                                                                                    <htv-select >
                                                                                        <input type="password" placeholder="Xác nhận mật khẩu" ng-model="user.confirmPassword"
                                                                                            required="required" className="login " />
                                                                                    </htv-select>
                                                                                </div>
                                                                                <div className="col-md-6 col-sm-6 col-xs-6 second-col register_gioitinh">
                                                                                    <htv-select>
                                                                                        <a className="btn btn-select login location">
                                                                                            <span className="btn-select-value">Chọn giới tính</span>
                                                                                            <span className="btn-select-arrow" />
                                                                                            <select>
                                                                                                <option value="" selected="selected" />
                                                                                                <option ng-repeat="item in items" value="">Nam</option>
                                                                                                <option ng-repeat="item in items" value="">Nữ</option>
                                                                                            </select>
                                                                                        </a>
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
                    </div>


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
            </div>
        );
    }
}
export default Login_Register;