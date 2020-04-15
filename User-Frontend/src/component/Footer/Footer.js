import React from 'react';
class Footer extends React.Component {
  render() {

    return (<div>
      <div className="footer-content">
        <footer id="footer" className="footer-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                <ul className="list-unstyled clear-margins">
                  <li className="widget-container widget_nav_menu">
                    <h1 className="title-widget">Hệ thống rạp</h1>
                    <ul>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> HTV Thủ Đức</a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> HTV Gò Vấp</a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> HTV Buôn Mê Thuột</a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> HTV Kinh Dương Vương</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                <ul className="list-unstyled clear-margins">
                  <li className="widget-container widget_nav_menu">
                    <h1 className="title-widget">HTV Cinemas</h1>
                    <ul>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Phim đang chiếu</a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Phim sắp chiếu</a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Phim hay tháng</a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Lịch chiếu</a>
                      </li>

                    </ul>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                <ul className="list-unstyled clear-margins">
                  <li className="widget-container widget_nav_menu">
                    <h1 className="title-widget">Thông tin</h1>
                    <ul>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Về chúng tôi</a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Hỏi &amp; Đáp</a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Rạp / giá vé</a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Tin tức</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
                <ul className="list-unstyled clear-margins">
                  <li className="widget-container widget_nav_menu">
                    <h1 className="title-widget">Chăm sóc khách hàng</h1>
                    <ul className="nomargin">
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Giờ làm việc: 8:00 - 22:00
                          <div>(Tất cả các ngày bao gồm cả Lễ Tết)</div>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-angle-double-right" /> Email hỗ trợ: tuanhungcinema@gmail.com</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

      </div>
      <div id="footer" className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="copyright">© 2020 Bản quyền thuộc về HTV Cinema</div>
            </div>
          </div>
        </div>
      </div></div>
    );
  }
}
export default Footer;