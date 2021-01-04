import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './index.css';

class NotFound extends Component {
    constructor(){
        super();
        this.state = {
            fuck: []
        }
    }
    refresh(url){
        // window.location.reload(false);
        window.location.href = url;
    }
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>
                                !وای
                            </h1>
                            <h2>
                                404 پیدا نشد
                            </h2>
                            <div className="error-details">
                                با عرض پوزش، خطایی رخ داده است، صفحه درخواستی یافت نشد
                            </div>
                            <div className="error-actions">
                                <Link to="/" onClick={ () => this.refresh('/')} className="btn btn-primary btn-lg">
                                    <i className="fas fa-home"></i>
                                    &nbsp;برو صفحه اصلی
                                </Link>
                                <Link to="/contactSupport" className="btn btn-secondary btn-lg">
                                    <i className="fas fa-envelope"></i>
                                    &nbsp;تماس با پشتیبانی
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;