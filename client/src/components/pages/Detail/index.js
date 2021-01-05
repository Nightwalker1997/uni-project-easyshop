import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Comment from './comment/index';

import './index.css'

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount(){
        const TEMP = this.props.posts.filter(index => index._id === this.props.match.params.id);
        this.setState({data: TEMP[0]})
    }

    render () {
        return(

                <div className="container commodity">

                    <div className="row">
                        <div className="col-sm-12"  key={this.state.data._id} >
                            <div className="card">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <div className="card-body-left">
                                            <dl className="row">
                                                <dt className="col-sm-2">اسم :</dt>
                                                <dd className="col-sm-9">{this.state.data.name}</dd>
                                                <dt className="col-sm-2">قیمت:</dt>
                                                <dd className="col-sm-9">
                                                    <p>{this.state.data.price} تومان</p>
                                                </dd>
                                                <dt className="col-sm-2">توضیحات:</dt>
                                                <dd className="col-sm-9">{this.state.data.about}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <img className="card-img card-img-top" src={this.state.data.imgSrc} alt={this.state.data.title}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col text-center">
                            <Link className={'btn btn-success'} to={'/payment/'+this.state.data.price*123456789} >خرید این کالا </Link>
                        </div>
                    </div>
                    <Comment commodity_id={this.props.match.params.id}/>

                </div>


        );
    }
}
const mapStateToProps = state => {
    return{
        posts: state.posts
    }
}

export default connect(mapStateToProps, null)(Detail);