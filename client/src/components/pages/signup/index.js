import React, {Component} from 'react';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            pass1: '',
            pass2: '',
            checkMessage: ''
        }
        this.submitForm     = this.submitForm.bind(this);
        this.nameChange     = this.nameChange.bind(this);
        this.emailChange    = this.emailChange.bind(this);
        this.addressChange  = this.addressChange.bind(this);
        this.pass1Change    = this.pass1Change.bind(this);
        this.pass2Change    = this.pass2Change.bind(this);
    }


    nameChange = (e) => {
        this.setState({name: e.target.value});
    }
    emailChange = (e) => {
        this.setState({email: e.target.value});
    }
    addressChange = (e) => {
        this.setState({address: e.target.value});
    }
    pass1Change = (e) => {
        this.setState({pass1: e.target.value});
    }
    pass2Change = (e) => {
        this.setState({pass2: e.target.value});
    }


    submitForm = (e) => {
        e.preventDefault();
        if (this.state.pass1 === this.state.pass2) {

            fetch('/signup', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    address: this.state.address,
                    password: this.state.pass1,
                    confirmPassword: this.state.pass2
                })
            }).then(res => res.json())
                .then(res => (res.msg === "user successfully created.")
                    ?
                        this.props.history.push("/login")
                    :
                        this.setState({checkMessage: res.msg}))


        }else {
            this.setState({checkMessage: "پسورد ها با هم فرق دارند."});
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">ساخت حساب کاربری</h5>

                                <form className="form-signin" onSubmit={ this.submitForm }>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="inputEmail">نام </label>
                                        <input type="text" id="name" className="form-control" placeholder="Name"
                                               value={this.state.name} onChange={this.nameChange} required autoFocus />
                                    </div>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="inputEmail">آدرس ایمیل </label>
                                        <input type="email" id="email" className="form-control" placeholder="Email address"
                                               value={this.state.email} onChange={this.emailChange} required />
                                    </div>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="inputEmail">آدرس محل سکونت </label>
                                        <input type="text" id="address" className="form-control" placeholder="َAddress"
                                               value={this.state.address} onChange={this.addressChange} required />
                                    </div>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="inputPassword ">رمز عبور</label>
                                        <input type="password" id="pass1" className="form-control" placeholder="Password"
                                               value={this.state.pass1} onChange={this.pass1Change} required />
                                    </div>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="inputPassword ">تکرار رمز عبور </label>
                                        <input type="password" id="pass2" className="form-control" placeholder="Re-Enter Password"
                                               value={this.state.pass2} onChange={this.pass2Change} required />
                                    </div>

                                    <br/>

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                                        ساخت حساب
                                    </button>


                                    <div>
                                        <h3>
                                            {this.state.checkMessage}
                                        </h3>
                                    </div>
                                    <hr className="my-4" />

                                    <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit">
                                        <i className="fab fa-google mr-2"></i> ساخت حساب با حساب گوگل
                                    </button>
                                    <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit">
                                        <i className="fab fa-facebook-f mr-2"></i> ساخت حساب با حساب  فیسبوک
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

export default Signup;