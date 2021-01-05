import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteUser} from "../../../Redux/Reducers";

import './Header.css';

class Header extends Component {
  render () {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse flex-row-reverse" id="navbarNavAltMarkup">

            <div className="navbar-nav ml-auto flex-row-reverse ">
                <Link className="nav-item nav-link" to="/">خانه <i className="fas fa-home"></i></Link>
                <Link className="nav-item nav-link" to="/search">جستجو <i className="fas fa-search"></i></Link>

                {this.props.isAdmin ? <Link className="nav-item nav-link" to="/upload">بارگذاری <i className="fas fa-upload"></i></Link>: ''}
            </div>

              <Link className="navbar-brand" to="/">EasyShop</Link>

            <div className="navbar-nav mr-auto flex-row-reverse">
              <div className="nav-item dropdown">
                <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                  <i className="fas fa-user"></i>
                </span>
                  {
                      this.props.user === undefined
                          ?
                          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                              <a className="dropdown-item" href="/login"><i className="fas fa-sign-in-alt"></i> ورود</a>
                              <a className="dropdown-item" href="/signup"><i className="fas fa-user-plus"></i> ثبت نام</a>
                          </div>
                      :
                          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                              <Link className="dropdown-item" to={''}>{this.props.user.name}&nbsp;<i className="fas fa-pen"></i></Link>
                              <hr/>
                              <Link className="dropdown-item pointer-cursor" onClick={this.props.logout} to={'/'}>

                                  خروج از حساب کاربری
                                  &nbsp;
                                  <i className="fas fa-sign-out-alt"></i>
                              </Link>
                          </div>
                  }
              </div>
            </div>
          </div>
        </nav>
    );
  }
}

const mapStateToPops = (state) => {
    return{
        user: state.user,
        isUser: state.isUser,
        isAdmin: state.isAdmin
    }
}
const mapDispatchToProps = dispatch => {
    return{
        logout: () => dispatch(deleteUser())
    }
}
export default connect(mapStateToPops, mapDispatchToProps)(Header);
