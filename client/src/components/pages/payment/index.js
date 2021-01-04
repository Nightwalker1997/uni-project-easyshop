import React, {Component} from 'react';
import './index.css';

class Payment extends Component {
    constructor(props){
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">

                                <h4 className="card-title text-center">صفحه ای تقلبی پرداخت</h4>
                                <h6>مبلغ قابل پرداخت {this.props.match.params.price / 123456789} تومان</h6>

                                <form className="form-signin" onSubmit={ this.submitForm }>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="CardNumber">شماره کارت </label>
                                        <input type="number" maxLength='20' minLength='16' size='16' className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                                               required autoFocus />
                                    </div>
                                    <div className="form-label-group text-right">
                                        <label htmlFor="CVVNumber">cvv </label>
                                        <input type="number" minLength='3' maxLength='4' className="form-control" placeholder="XXX"
                                               required />
                                    </div>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="EndNumber">تاریخ انقاضی کارت</label>
                                        <input type="number" className="form-control" placeholder="00/00"
                                               required />
                                    </div>

                                    <div className="form-label-group text-right">
                                        <label htmlFor="CardPassword ">رمز کارت</label>
                                        <input type="password" className="form-control" placeholder="Password"
                                               required />
                                    </div>


                                    <div className="custom-control custom-checkbox mb-3 text-right">
                                        <input type="checkbox" className="custom-control-input" />
                                        <label className="custom-control-label" >ذخیره اطلاعات کارت</label>
                                    </div>

                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                                        پرداخت
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

export default Payment;