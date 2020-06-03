import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.onChangefirstName = this.onChangefirstName.bind(this)
        this.onChangelastName = this.onChangelastName.bind(this)
        this.onChangeGender = this.onChangeGender.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangePasswordConf = this.onChangePasswordConf.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.onResetForm = this.onResetForm.bind(this)

        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            password: '',
            passwordConf: '',
            submit: false
        }
    }

    // handleChangeField=()=>{
    //     this.setState({
    //         firstName: this.refs.firstName.value,
    //         lastName: this.refs.lastName.value,
    //         gender: this.refs.gender.value,
    //         email: this.refs.email.value,
    //         password: this.refs.password.value,

    //     })
    // }
    onChangefirstName = (fName) => {
        this.setState({
            firstName: fName.target.value
        })
    }
    onChangelastName = (lName) => {
        this.setState({
            lastName: lName.target.value
        })
    }
    onChangeGender = (g) => {
        this.setState({
            gender: g.target.value
        })
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
    onChangePasswordConf = (passwordConf) => {
        this.setState({
            passwordConf: passwordConf.target.value
        });
    }
    onResetForm = () => {
        this.setState({
            ...this.state,
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            password: '',
            passwordConf: '',
            submit: false
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const account = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            email: this.state.email,
            password: this.state.password,
            passwordConf: this.state.passwordConf
        }

        // let { email, password, firstName, lastName } = this.state;
        // if (!email || !password || !firstName || !lastName) {
        //     this.setState({
        //         message: "Vui lòng nhập đầy đủ thông tin"
        //     })
        // }
        // else {

        let {password, passwordConf} = this.state;
        if (password === passwordConf) {
            axios.post('http://localhost:8000/user/signup', account)
                .then((res) => {
                    console.log(account)
                    if (!res.data.error) {
                        this.setState({ submit: true });
                        return window.location.reload()
                    } else {
                        window.alert(res.data.error)
                    }
                });
        }
        else{
            window.alert("Mật khẩu không khớp. Vui lòng nhập lại!")
        }


        this.setState({
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            password: '',
            passwordConf: '',
        });
        // }

    }

    render() {
        return (
            !this.state.submit ? (
                <div className="login-tab-wrapper">
                    <div className="login-form">
                        <form onSubmit={this.onSubmit}>
                            <div className="row city">
                                <div className="col-md-6 col-sm-6 col-xs-6 first-col">
                                    <input type="email" placeholder="Email" required="required"
                                        className="login register-input remove-mb"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        tabIndex="1"
                                    />
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 second-col">
                                    <input type="text" placeholder="Họ"
                                        className="login" required="required"
                                        value={this.state.lastName}
                                        onChange={this.onChangelastName}
                                        tabIndex="4"
                                    />
                                </div>
                            </div>

                            <div className="row city">
                                <div className="col-md-6 col-sm-6 col-xs-6 first-col">
                                    <input type="password" placeholder="Mật khẩu" required="required"
                                        className="login"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        tabIndex="2"
                                    />
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 second-col">
                                    <input type="text" placeholder="Tên"
                                        className="login" required="required"
                                        value={this.state.firstName}
                                        onChange={this.onChangefirstName}
                                        tabIndex="5"
                                    />
                                </div>
                            </div>
                            <div className="row city">
                                <div className="col-md-6 col-sm-6 col-xs-6 first-col">
                                    <htv-select >
                                        <input type="password" placeholder="Xác nhận mật khẩu"
                                            required="required" className="login "
                                            value={this.state.passwordConf}
                                            onChange={this.onChangePasswordConf}
                                            tabIndex="3"
                                        />
                                    </htv-select>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 second-col register_gioitinh">
                                    <htv-select>
                                        <div className="btn-select-sex login location">
                                            <select id="sex"
                                                value={this.state.gender}
                                                onChange={this.onChangeGender}>
                                                <option value="" disabled selected  tabIndex="6">Chọn giới tính</option>
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>
                                                <option value="other">Khác</option>
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

                //Modal Đăng ký thành công
                //   <div id="success-modal" style={{ zIndex: 1111 }} className="modal fade">
                //     <div className="modal-dialog">
                //       <div className="modal-outer-container">
                //         <div className="modal-middle-container">
                //           <div className="login-wrapper animated slideInDown">
                //             <div className="login-container">
                //               <span className="close">
                //                 <i className="icon-cancel" />
                //               </span>
                //               <div className="tab-login-line">
                //                 <div className="tab-login-title">Đăng ký thành công</div>
                //                 <div className="login-tab-wrapper">
                //                   <div className="login-heading success">
                //                     <i className="icon-success" />
                //                     <div className="text-heading">
                //                       <span className="sub-text">Bạn vui lòng truy cập email để kích hoạt tài khoản.</span>
                //                     </div>
                //                   </div>
                //                 </div>
                //               </div>
                //             </div>
                //           </div>
                //         </div>
                //       </div>
                //     </div>
                //   </div>


            ) : (
                    <Redirect to={{ pathname: "/", state: { from: "/register" } }} />
                )

        );
    }
}
export default Register;