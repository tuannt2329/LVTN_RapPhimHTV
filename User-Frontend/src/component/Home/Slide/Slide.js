import React from 'react';
class Slide extends React.Component {
    render() {
        return (

            <div id="main-carousel" data-ride="carousel" data-interval={3000} className="carousel slide">
                <ol className="carousel-indicators hidden-sm hidden-xs">
                    <li data-target="#main-carousel" data-slide-to={0} className="active" />
                    <li data-target="#main-carousel" data-slide-to={1} />
                    <li data-target="#main-carousel" data-slide-to={2} />
                    <li data-target="#main-carousel" data-slide-to={3} />
                </ol>

                <div role="listbox" className="carousel-inner">
                    <a href="/" className="item active">
                        <img src="htv/website/images/BgSlide_SangDaCungNivea.jpg"
                            className="lazy hidden-xs hidden-sm loaded" />
                        {/* ReponSive for mobile */}
                        <img src="htv/website/images/BgSlide_SangDaCungNivea.jpg"
                            className="lazy hidden-md hidden-lg" />
                    </a>

                    <a href="/" className="item">
                        <img src="htv/website/images/BgSlide_BloodShot.jpg"
                            className="lazy hidden-xs hidden-sm loaded" />
                        {/* ReponSive for mobile */}
                        <img src="htv/website/images/BgSlide_BloodShot.jpg"
                            className="lazy hidden-md hidden-lg" />
                    </a>

                    <a href="/" className="item">
                        <img src="htv/website/images/BgSlide_Nang3LoiHuaCuaCha.jpg"
                            className="lazy hidden-xs hidden-sm loaded" />
                        {/* ReponSive for mobile */}
                        <img src="htv/website/images/BgSlide_Nang3LoiHuaCuaCha.jpg"
                            className="lazy hidden-md hidden-lg" />
                    </a>

                    <a href="/" className="item">
                        <img src="htv/website/images/BgSlide_TruyTimPhepThuat.jpg"
                            className="lazy hidden-xs hidden-sm loaded" />
                        {/* ReponSive for mobile */}
                        <img src="htv/website/images/BgSlide_TruyTimPhepThuat.jpg"
                            className="lazy hidden-md hidden-lg" />
                    </a>
                </div>

                {/* Button Pre,Next Carousel */}
                <a role="button" href="#main-carousel" data-slide="prev" className="left carousel-control hidden-xs hidden-sm">
                    <span aria-hidden="true" className="glyphicon glyphicon-chevron-left" />
                    <span className="sr-only">Previous</span>
                </a>
                <a role="button" href="#main-carousel" data-slide="next" className="right carousel-control hidden-xs hidden-sm">
                    <span aria-hidden="true" className="glyphicon glyphicon-chevron-right" />
                    <span className="sr-only">Next</span></a>


                {/* Mua vé nhanh */}
                <div className="container">
                    <div className="box-buy-ticket animated zoomIn">
                        <section className="tabs">
                            <div className="label-tab hidden-sm hidden-xs">mua vé nhanh</div>
                            <h3 className="hidden-lg hidden-md">Mua Vé Nhanh</h3>
                            <input id="tab-1" type="radio" name="radio-set" defaultChecked="checked"
                                className="tab-selector-1" />
                            <label htmlFor="tab-1" className="tab-label-1">Theo phim</label>
                            <input id="tab-2" type="radio" name="radio-set" className="tab-selector-2" />
                            <label htmlFor="tab-2" className="tab-label-2">Theo ngày</label>
                            <input id="tab-3" type="radio" name="radio-set" className="tab-selector-3" />
                            <label htmlFor="tab-3" className="tab-label-3">Theo rạp</label>
                            <div className="clear-shadow" />
                            <div id="id-block-ticket" className="content">
                                <div className="content-1">
                                    <form>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn phim</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />
                                                    <option>Nắng 3: Lời Hứa Của Cha</option>
                                                    <option>Onward</option>
                                                    <option>Lake Of Death</option>
                                                    <option>I Still Believe</option>
                                                    <option>Bloodshot</option>
                                                </select>
                                            </a>
                                        </htv-select>
                                        <htv-select >
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn rạp</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />
                                                </select>
                                            </a>
                                        </htv-select>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn ngày</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />
                                                </select>
                                            </a>
                                        </htv-select>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn suất</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />

                                                </select>
                                            </a>
                                        </htv-select>
                                    </form>
                                </div><div className="content-2">
                                    <form>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn ngày</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />
                                                    <option>Thứ ba, 10/03/2020</option>
                                                    <option>Thứ tư, 11/03/2020</option>
                                                    <option>Thứ năm, 12/03/2020</option>
                                                    <option>Thứ sáu, 13/03/2020</option>
                                                    <option>Thứ bảy, 14/03/2020</option>
                                                    <option>Chủ nhật, 15/03/2020</option>
                                                </select>
                                            </a>
                                        </htv-select>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn rạp</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />

                                                </select>
                                            </a>
                                        </htv-select>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn phim</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />

                                                </select>
                                            </a>
                                        </htv-select>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn suất</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />

                                                </select>
                                            </a>
                                        </htv-select>
                                    </form>
                                </div>
                                <div className="content-3">
                                    <form>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn rạp</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />
                                                    <option>HTV Linh Trung</option>
                                                    <option>HTV Nguyễn Du</option>
                                                    <option>HTV Tân Bình</option>
                                                    <option>HTV Kinh Dương Vương</option>
                                                    <option>HTV Quang Trung</option>
                                                </select>
                                            </a>
                                        </htv-select>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn phim</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />

                                                </select>
                                            </a>
                                        </htv-select>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn ngày</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />
                                                </select>
                                            </a>
                                        </htv-select>
                                        <htv-select>
                                            <a className="btn btn-select btn-select-light">
                                                <span className="btn-select-value">Chọn suất</span>
                                                <span className="btn-select-arrow" />
                                                <select>
                                                    <option value="" selected="selected" />
                                                </select>
                                            </a>
                                        </htv-select>
                                    </form>
                                </div>
                            </div>

                            {/* Button Mua vé nhanh */}
                            <div id="loginBuyticket" className="btn primary fl-right btn-buyticket-box">Mua vé</div>
                        </section>
                    </div>
                </div>
            </div>

        );
    }
}
export default Slide;