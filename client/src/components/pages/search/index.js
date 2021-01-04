import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.css';

import Posts from "../home/Posts";
import Pagination from "../home/Pagination";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfAll: [],
            activePage: 1,
            postPerPage: 12,
            postsNumber: 1,
            activePagePosts : [],
            s: ''
        }

        this.changePage = this.changePage.bind(this);
        this.search     = this.search.bind(this);
    }


    componentDidMount() {

        if (this.props.posts.length > 0){
            let temp = this.props.posts;
            this.setState({ listOfAll: temp });
        }
        this.historyMange();


    }

    componentDidUpdate(prevProps, prevState){
        let temp = this.props.posts;

        if (prevProps.posts !== this.props.posts){
            this.setState({ listOfAll: temp });
        }

        if (prevState.s !== this.state.s){
            if (this.state.s.length > 0){
                const regex = new RegExp(`^${this.state.s.toLowerCase()}`);
                const matchedPosts = temp.filter(index => index.name.toLowerCase().match(regex));

                if (matchedPosts.length === 0){
                    this.setState({ listOfAll: temp });
                }

                this.setState({ listOfAll: matchedPosts });
            }else if (this.state.s.length === 0){
                this.setState({ listOfAll: temp });
            }
        }

        if (this.state.listOfAll !== prevState.listOfAll) {
            this.setState({postsNumber: this.state.listOfAll.length});
        }

        if (this.state.postsNumber !== prevState.postsNumber || this.state.activePage !== prevState.activePage) {
            const indexOfLastPost = this.state.activePage * this.state.postPerPage;
            const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
            this.setState({activePagePosts: this.state.listOfAll.slice(indexOfFirstPost, indexOfLastPost)});
        }
    }

    historyMange(){
        if (this.props.match.path === "/page/:number") {
            this.setState({activePage: this.props.match.params.number});
        }
    }

    changePage(number){
        this.setState({activePage: number});
        this.props.history.push(`/page/${number}`);
    }

    search = (e) => {
        this.setState({s: e.target.value})
    }


    render () {
        return (
            <div className="container-fluid">
                <div className="input-group mb-3" >

                    <input type="text" className="search-inout" placeholder="Search" aria-label="Username"
                           onChange={this.search}
                           aria-describedby="basic-addon1" autoFocus required/>
                </div>
                <Posts
                    posts={this.state.activePagePosts}
                />

                <Pagination
                    totalPosts={this.state.postsNumber}
                    postPerPage={this.state.postPerPage}
                    currentPage={this.state.activePage}
                    changePage={this.changePage}
                />
            </div>
        );
    }
}


const mapStateToPops = (state) => {
    return{
        posts: state.posts
    }
}
export default connect(mapStateToPops, null)(Search);