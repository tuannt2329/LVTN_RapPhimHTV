import React from 'react';
import LoginRegister from '../User/Login';
import DateTime from './DateTime/DateTime';
import NavbarHTV from './Navbar/Navbar';
import axios from "axios";
import Search from './Search/Search';
class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            films: [],
            theloai: [],
            theloai2: [],
        }
    }

    setStateFilms = (data) => {
        this.setState({ films: data.film })
    }
    UNSAFE_componentWillMount() {
        axios.post("http://localhost:8000/film/find")
            .then((res) => {
                this.setStateFilms(res.data);
                res.data.film.filter(item =>
                    Date.parse(item["NgayKetThuc"]) > Date.parse(Date())).forEach(element => {
                        this.setState({
                            theloai: [...this.state.theloai, element.TheLoai]
                        })
                    });
            }).then(r => this.setState({
                theloai2: [... new Set(this.state.theloai)]
            }));
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="header-nav-wrapper">
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <div className="logo">
                                    <a href="/">
                                        <img src="htv/website/images/rsz_htv_formal_logosvg.png"
                                            alt="HTV Cinema"
                                            className="lazy hidden-xs hidden-sm loaded" />
                                        <img src="htv/website/images/rsz_htv_formal_logosvg.png"
                                            alt="HTV Cinema"
                                            className="lazy hidden-lg hidden-md" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-8">
                                <div className="primary-nav-wrapper hidden-xs hidden-sm">
                                    <Search />
                                    {/* <div className="search">
                                        <htv-search-bar>
                                            <form className="search-form">
                                                <div className="input-append">
                                                    <input placeholder="Tìm tên phim, diễn viên..."
                                                        className="search-box"
                                                        type="text" autoComplete="off" />
                                                    <button type="submit" className="search-btn">
                                                        <i className="fa fa-search" />
                                                    </button>
                                                </div>
                                            </form>
                                        </htv-search-bar>
                                    </div> */}

                                    <DateTime />
                                    
                                    <LoginRegister />
                                </div>
                            </div>
                        </div>
                    </div>



                </div>

                {/* Icon navicon reponsive mobile */}
                <div className="navicon fixed-mobile"><a href="#" className="nav-toggle"><span /></a></div>


                <NavbarHTV films={this.state.films} theloai={this.state.theloai2} />


            </div>
        );
    }
}
export default Header;