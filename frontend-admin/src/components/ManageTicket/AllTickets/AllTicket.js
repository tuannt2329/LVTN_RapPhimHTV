import React, { Component } from 'react';
import Menu from '../../Menu/Menu';
import axios from "axios";
var idArray = []
var tks 
class AllTickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            ids: [],
            searchText: ""
        };
        this.handleDeleteTicketExpired = this.handleDeleteTicketExpired.bind(this)
        this.onchangeSearch = this.onchangeSearch.bind(this)
        this.onSubmitSearch = this.onSubmitSearch.bind(this)
    }

    UNSAFE_componentWillMount() {
        this.isLocalStorage();
        const status = {
            status: false
        }
        axios.post("http://localhost:8000/ticket/find", status)
            .then((res) => {
                if(!res.data.error) {
                    this.setStateFilms(res.data)
                    this.handleDeleteTicketExpired()
                    this.state.films.map((item) => {
                        idArray.push(item._id)
                    })
                    this.setState({ids: idArray})
                } else {
                    if (res.data.error != "ticket don't exist!")
                        return window.alert(res.data.error)
                }
            });
    }

    handleDeleteTicketExpired = async () => {
        var today = new Date()
        let date = today.getFullYear()
        if ((today.getMonth() + 1) < 10) {
          date += '-0' + (today.getMonth() + 1)
        } else {
          date += '-' + (today.getMonth() + 1)
        }
        if (today.getDate() < 10) {
          date += '-0' + today.getDate()
        } else {
          date += '-' + today.getDate()
        }
        let time = ''
        
        if((today.getMinutes() + 15) < 45) {
          if (today.getHours() < 10) {
            time += '0' + today.getHours()
          } else {
            time += today.getHours()
          }
    
          time += ':' + (today.getMinutes() + 15)
        } else {
          if (today.getHours() + 1 < 10) {
            time += '0' + (today.getHours() + 1)
          } else {
            time += (today.getHours() + 1)
          }
          if((today.getMinutes() - 45) < 10) {
            time += ':0' + (today.getMinutes() - 45)
          } else {
            time += ':' + (today.getMinutes() - 45)
          }
        }
        if (today.getSeconds() < 10) {
          time += ':0' + today.getSeconds()
        } else {
          time += ':' + today.getSeconds()
        }
        time += '.000Z'
        const datetime = date + 'T' + time
    
        if(this.state.films.length != 0) {
          await this.state.films.forEach( async (element, index) => {
            if(element.ThoiGianChieu <= datetime && element.payed === false) {
              const ticketdeleteparams = {
                TenFilm: element.TenFilm,
                ThoiGianChieu: datetime,
                TenPhong: element.TenPhong,
                ThoiGianChieu1: element.ThoiGianChieu
              }
              await axios.post('http://localhost:8000/ticket/deleteTicket', ticketdeleteparams)
                .then((res) => {
                  if(!res.data.error) {
                    let arrticket = this.state.films
                    arrticket.splice(index, 1);
                    this.setState({ films: arrticket})
    
                    return("success")
                  } else {
                    window.alert(res.data.error)
                    return ({error: res.data.error})
                  }
                })
            }
          });
        }
        
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
        return (
            <div>
                <Menu />
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>All Tickets</h1>

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
                                        <li className="breadcrumb-item actifilms">AllTickets</li>
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
                                                            <a href='/detailticket' onClick={this.handleOnclickFilm.bind(this, item._id)}>
                                                                <center><dt>{item._id}</dt></center>
                                                            </a>
                                                            {
                                                                item.payed === true ? 
                                                                    <center><p>Đã thanh toán</p></center> 
                                                                :
                                                                    <center><p>Chưa thanh toán</p></center>
                                                            }
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
                                                            <a href='/detailticket'  onClick={this.handleOnclickFilm.bind(this, item._id)}>
                                                                <center><dt>{item._id}</dt></center>
                                                                {
                                                                    item.payed === true ? 
                                                                        <center><p>Đã thanh toán</p></center> 
                                                                    :
                                                                        <center><p>Chưa thanh toán</p></center>
                                                                }
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

export default AllTickets;
