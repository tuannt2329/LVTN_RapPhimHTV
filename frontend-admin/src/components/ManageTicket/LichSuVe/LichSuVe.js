import React, { Component } from 'react';
import Menu from '../../Menu/Menu';
import axios from "axios";
var idArray = []
var tks 
class TicketsHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            ids: [],
            searchText: ""
        };
        this.onchangeSearch = this.onchangeSearch.bind(this)
        this.onSubmitSearch = this.onSubmitSearch.bind(this)
    }

    UNSAFE_componentWillMount() {
        this.isLocalStorage();
        const status = {
            status: true
        }
        axios.post("http://localhost:8000/ticket/find", status)
            .then((res) => {
                if(!res.data.error) {
                    this.setStateFilms(res.data)
                    res.data.ticket.map((item) => {
                        idArray.push(item._id)
                    })
                    this.setState({ids: idArray})
                } else {
                    return window.alert(res.data.error)
                }
            });
    }

    setStateFilms = (data) => {
        tks = data.ticket
        this.setState({ films: data.ticket });
    }

    isLocalStorage = () => {
        if (JSON.parse(sessionStorage.getItem('user')) != null) {
            var username = JSON.parse(sessionStorage.getItem('user'))["firstName"] ?
                JSON.parse(sessionStorage.getItem('user'))["firstName"] : null;
        }
        if(!username)
            return window.location = '/';
    }

    handleOnclickFilm = (id) => {
        sessionStorage.setItem("id", id);
    }

    onchangeSearch = (text) => {
        this.setState({films: tks})
        this.setState({
            searchText: text.target.value
        })
    }

    onSubmitSearch = () => {
            this.setState({films: tks})
            let tk = []
            this.state.films.map((item) => {
                console.log(item._id.substring(0, this.state.searchText.length))
                if(item._id.substring(0, this.state.searchText.length) === this.state.searchText) {
                    tk.push(item)
                }
            })
            this.setState({
                films: tk
            })
        
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Menu />
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Tickets History</h1>

                                    <div className="search">
                                        <div className="input-append">
                                            <input placeholder="id phim"
                                                className="search-box"
                                                type="text" autoComplete="off" onChange={this.onchangeSearch}/>
                                            <button className="search-btn">
                                                <i className="fa fa-search" onClick={this.onSubmitSearch} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/menu">Home</a></li>
                                        <li className="breadcrumb-item active">TicketsHistory</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                            {this.state.films.map((item, index) =>
                                (index === 0) ?
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                                            <a href='/detailtickethistory' onClick={this.handleOnclickFilm.bind(this, item._id)}>
                                                                <center><dt>{item._id}</dt></center>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item carousel-item-next carousel-item-left">
                                                            <a href='/detailtickethistory'  onClick={this.handleOnclickFilm.bind(this, item._id)}>
                                                                <center><dt>{item._id}</dt></center>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            )}
                            </div>
                            <a id="back-to-top" href="#" className="btn btn-primary back-to-top" role="button" aria-label="Scroll to top">
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

export default TicketsHistory;
