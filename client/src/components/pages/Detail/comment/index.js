import React, { Component } from 'react';
import {connect} from 'react-redux';

// import marked from 'marked';
import './index.css';
import {Link} from "react-router-dom";
import Convert from '../../../../Utilities/convertDate'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            comments: []
        };
        //binding all our functions to this class
        this.deleteComment = this.deleteComment.bind(this);
        this.postComment = this.postComment.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentDidMount = () => {
        this.getComments();
    }

    getComments = async ()=>{
        await fetch(`/comment/${this.props.commodity_id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({comments: res})
            })

    }

    postComment(e) {
        e.preventDefault();
        const id = this.props.commodity_id;
        const author = this.props.user.name;

        fetch('/comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commodity_id: id,
                author: author,
                text: this.state.text,
            })
        }).then(res => res.json())
            .then(res => {
                // console.log(res)
                })

        this.setState({ text: '' });
        this.getComments();
    }

    cancelComment(e) {
        e.preventDefault();
        this.setState({
            text: ''
        })
    }

    deleteComment(id) {
        fetch(`/comment/delete/${id}`, {
            method: 'DELETE'
        })

        this.getComments();
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }



    render() {
        return (
            <div className="container mt-5">
                <div className="d-flex justify-content-center row">
                    <div className="col-md-8">
                        <div className="d-flex flex-column comment-section">
                            {this.state.comments.map(index =>

                                <div className="bg-white p-2" key={index._id}>
                                    <div className="d-flex flex-row user-info">
                                        <div className="d-flex flex-column justify-content-start ml-2">
                                            <span className="d-block font-weight-bold name">
                                                {index.author}
                                            </span>
                                            <span className="date text-black-50">
                                                {Convert(index.date)}
                                                &nbsp;:&nbsp;
                                                به اشتراک گذاشته شده در


                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="comment-text">
                                            {index.text}
                                        </p>
                                    </div>


                                    {
                                        this.props.user && this.props.user.AccessLevel === 'ADMIN'
                                            ?
                                            <div className="bg-white">
                                                <div className="d-flex flex-row fs-12">
                                                    <div className="like p-2 cursor" onClick={() => this.deleteComment(index._id)}>
                                                        <i className="fa fa-trash"></i>
                                                        <span className="ml-1">
                                                    Delete
                                                </span>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            ''
                                    }

                                </div>
                            )}


                            {
                                this.props.isUser
                                    ?
                                    <div className="bg-light p-2">
                                        <div className="d-flex flex-row align-items-start">
                                    <textarea className="form-control ml-1 shadow-none textarea"
                                              onChange={this.handleTextChange}
                                              value={this.state.text}>

                                    </textarea>
                                        </div>
                                        <div className="mt-2 text-right">
                                            <button className="btn btn-primary btn-sm shadow-none"
                                                    onClick={this.postComment}
                                                    type="button">
                                                Post comment
                                            </button>
                                            <button className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                                                    onClick={this.cancelComment}
                                                    type="button">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div align="center">
                                        برای کامنت گذاشتن باید
                                        <Link className={"btn btn-link"} to={'/login'}><b><i> وارد </i></b></Link>
                                        سایت بشوید.
                                    </div>
                            }


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user,
        isUser: state.isUser
    }
}

export default connect(mapStateToProps, null)(Index);