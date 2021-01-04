import React, {Component} from 'react';
import './index.css';

import {connect} from 'react-redux';
import {loadUser} from "../../../Redux/Reducers";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            pass1: '',
            checkMessage: ''
        }
        this.submitForm     = this.submitForm.bind(this);
        this.usernameChange    = this.usernameChange.bind(this);
        this.pass1Change    = this.pass1Change.bind(this);
    }

    submitForm = (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.pass1
        };
        this.props.login(user);

    }

    usernameChange = (e) => {
        this.setState({username: e.target.value});
    }
    pass1Change = (e) => {
        this.setState({pass1: e.target.value});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">ورود به حساب کاربری</h5>
                                {
                                    this.state.checkMessage
                                        ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.checkMessage}
                                        </div>
                                        :''

                                }

                                <form className="form-signin" onSubmit={ this.submitForm }>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="inputEmail">آدرس ایمیل </label>
                                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                                               value={this.state.username} onChange={this.usernameChange} required autoFocus />
                                    </div>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="inputPassword ">رمز</label>
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                               value={this.state.pass1} onChange={this.pass1Change} required />
                                    </div>

                                    {/*<br />*/}

                                    <div className="custom-control custom-checkbox mb-3 text-right">

                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">رمز عبور را بخاطر بسپارید</label>
                                    </div>

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                                        ورود
                                    </button>
                                    <div className="custom-control custom-checkbox mb-3 text-right signupbutton">
                                        <a href="/signup">ساخت حساب</a>
                                        <br/>
                                        <a href="/forgotpasssword">فراموشی رمز  عبور</a>
                                    </div>


                                    <br/>
                                    <hr className="my-4" />

                                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit">
                                            <i className="fab fa-google mr-2"></i> ورود با حساب گوگل
                                        </button>
                                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit">
                                            <i className="fab fa-facebook-f mr-2"></i> ورود با حساب  فیسبوک
                                        </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateTOProps = state => {
    return{
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return{
        login: (user) => dispatch(loadUser(user))
    }
}

export default connect(
    mapStateTOProps,
    mapDispatchToProps
)(Login);