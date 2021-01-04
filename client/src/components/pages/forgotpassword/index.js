import React, {Component} from 'react';
import './index.css';

class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            success: false
        }
        this.showAlert = this.showAlert.bind(this);
        this.usernameChange    = this.usernameChange.bind(this);

    }

    usernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    showAlert = (e) => {
        e.preventDefault();
        fetch('/forgotpasssword', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.username
            })
        }).then(res => res.json())
            .then(res => console.log(res))

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">درخواست رمز عبور جدید</h5>

                                <form className="form-signin" onSubmit={this.showAlert}>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="inputEmail">آدرس ایمیل </label>
                                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                                               value={this.state.username} onChange={this.usernameChange} required autoFocus />
                                    </div>

                                    <br />


                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                                        ارسال رمز جدید
                                    </button>

                                </form>
                                <br/>
                                {this.state.alert}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;