import React, {Component} from 'react';
import './Footer.css';

class Footer extends Component {
  render () {
    return (
        <footer>
          <div className="container-fluid text-center text-md-left footer-content">
            <div className="row">
              <div className="col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1">
                <p>این سایت برای پروژه دانشگاهی اینجانب ایجاد شده است.</p>
              </div>
              <div className="col-md-2 col-lg-2 mx-auto my-md-4 my-0 mt-4 mb-1">
                <h5 className="font-weight-bold text-uppercase mb-4">About</h5>
                <ul className="list-unstyled">
                  <li>
                    <p>
                      <a href="/nsaljsda">ABOUT US</a>
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
                <h5 className="font-weight-bold text-uppercase mb-4">Address</h5>
                <ul className="list-unstyled">
                  <li>
                    <p>
                      <i className="fas fa-home mr-3"></i>زمین</p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-envelope mr-3"></i> easyshop.proj95234621@gmail.com</p>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 col-lg-2 text-center text-md-left mx-auto my-4">
                <h5 className="font-weight-bold text-uppercase mb-4">Follow Us</h5>
                <ul className="list-unstyled">
                  <li>
                    <p>
                      <a  className="btn-floating btn-gplus a-no-color"  href="/google plus">
                        <i className="fab fa-telegram"></i> telegram
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a  className="btn-floating btn-dribbble a-no-color"  href="/spkdnansdo">
                        <i className="fab fa-instagram"></i> instagram
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright text-center">© 2020 Copyright:
            <a href="/" className={"a-no-color"}> easyshop.com</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
