import React from 'react';
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Search.css'
var tenphimArray = []
var tenfilm

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            tenphims: [],
            searchText: "",
            suggestions: [],
            text: '',
            tenphimArray: []
        }
    }

    UNSAFE_componentWillMount() {
        axios.post("http://localhost:8000/film/find")
            .then((res) => {
                if (!res.data.error) {
                    this.setStateFilms(res.data.film.filter(item => Date.parse(item["NgayKetThuc"]) >  Date.parse(Date())))
                    this.state.films.map((item) => {
                        // tenphimArray.push(item.TenFilm, item.DaoDien)
                        tenphimArray.push(item.TenFilm)
                    })
                    this.setState({ tenphims: tenphimArray })
                } else {
                    if (res.data.error != "Film don't exist")
                        return window.alert(res.data.error)
                }
            });
    }

    setStateFilms = (data) => {
        tenfilm = data
        this.setState({ films: data });
    }

    handleOnclickFilm = (tenphim) => {
        sessionStorage.setItem("tenphim", tenphim);
    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');

            suggestions = tenphimArray.sort().filter(v => regex.test(v))
            console.log(suggestions)
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul id="search-list" className="search-list" >
                {
                    suggestions.map((item, index) => (
                        <li>
                            <a href="/detailfilm"
                                key={index} onClick={() => this.handleOnclickFilm(item)}>{item}
                            </a>
                        </li>
                    ))}
                <div className="suggestions">Gợi ý: {suggestions.length} phim</div>
            </ul>
        );
    }

    render() {
        const { text, suggestions } = this.state;
        return (
            <div className="search">
                <htv-search-bar>
                    <form className="search-form">
                        <div className="input-append">
                            <input placeholder="Nhập tên phim ..."
                                className="search-box"
                                onChange={this.onTextChange} value={text} />
                            {this.renderSuggestions()}

                            {/* <button type="submit" className="search-btn">
                                <Link>
                                    <i className="fa fa-search" onClick={this.onSubmitSearch} />
                                </Link>
                            </button> */}

                        </div>
                    </form>
                </htv-search-bar>
            </div>
        );
    }
}
export default Search;