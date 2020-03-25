import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeFirstName=this.onChangeFirstName.bind(this)
        this.onChangeLastName=this.onChangeLastName.bind(this)
        this.onChangeGender=this.onChangeGender.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onResetForm = this.onResetForm.bind(this)

        this.state = {
            firstname: '',
            lastname: '',
            gender: '',
            email: '',
            password: '',
            submit: false
        }
    }

    // handleChangeField=()=>{
    //     this.setState({
    //         firstname: this.refs.firstname.value,
    //         lastname: this.refs.lastname.value,
    //         gender: this.refs.gender.value,
    //         email: this.refs.email.value,
    //         password: this.refs.password.value,

    //     })
    // }
    onChangeFirstName = (fName) => {
        this.setState({
            firstname: fName.target.value
        })
    }
    onChangeLastName = (lName) => {
        this.setState({
            lastname: lName.target.value
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

    onResetForm = () => {
        this.setState({
            ...this.state,
            firstname: '',
            lastname: '',
            gender: '',
            email: '',
            password: '',
            submit: false
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const account = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            gender: this.state.gender,
            email: this.state.email,
            password: this.state.password
        }

        let { email, password, firstname, lastname } = this.state;
        if (!email || !password || !firstname || !lastname) {
            this.setState({
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        else {
            console.log("abc")
            axios.post('localhost:8000/user/signup', account)
                .then((res) => {
                    if (res.data.error) {
                        this.setState({ submit: true });
                        return window.location.reload()
                    } else {
                        window.alert(res.data.error)
                    }
                });

            this.setState({
                firstname: '',
                lastname: '',
                gender: '',
                email: '',
                password: ''

            });
        }

    }

    render() {
        return (
            !this.state.submit ? (
                <div className="login-tab-wrapper">
                    <div className="login-form">
                        <form onSubmit={this.onSubmit}>
                            <div className="row city">
                                <div className="col-md-6 col-sm-6 col-xs-6 first-col">
                                    <input type="text" placeholder="Họ"
                                        className="login" required="required"
                                        value={this.state.firstname}
                                        onChange={this.onChangeFirstName}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 second-col">
                                    <input type="text" placeholder="Tên"
                                        className="login" required="required"
                                        value={this.state.lastname}
                                        onChange={this.onChangeLastName}
                                    />
                                </div>
                            </div>

                            <div className="row city">
                                <div className="col-md-6 col-sm-6 col-xs-6 first-col">
                                    <input type="email" placeholder="Email" required="required"
                                        className="login register-input remove-mb" 
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 second-col">
                                    <input type="password" placeholder="Mật khẩu" required="required"
                                        className="login"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                    />
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
                                            <select id="sex"
                                                value={this.state.gender}
                                                onChange={this.onChangeGender}>
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
                    <Redirect to={{ pathname: "/login", state: { from: "/register" } }} />
                )

        );
    }
}
export default Register;