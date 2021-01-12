import React, {Component} from 'react';
import {connect} from 'react-redux';//useselector is a hooks v7.1 added
//React Hook "useSelector" cannot be called in a class component.
// React Hooks must be called in a React function component or a custom React Hook function
// react-hooks/rules-of-hooks

import Posts from './Posts';
import Pagination from './Pagination';
import Carousel from "./Carousel";

import './index.css';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfAll: [],
            activePage: 1,
            postPerPage: 12,
            postsNumber: 1,
            activePagePosts : []
        }
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        if (this.props.posts.length > 0){
            let temp = this.props.posts;
            this.setState({ listOfAll: temp });
        }

        this.historyMange();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.location.pathname !== this.props.location.pathname){
            if (this.props.location.pathname === '/'){
                this.setState({activePage: 1})
            }
        }
        if (prevProps.posts !== this.props.posts){
            let temp = this.props.posts;
            this.setState({ listOfAll: temp });
        }

        if (prevState.listOfAll !== this.state.listOfAll) {
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

    render () {
        return (
            <div className="container-fluid">
                {this.props.location.pathname === '/'?
                    <Carousel posts={this.state.listOfAll.slice(0, 5)}/>
                    : null }

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

const mapStateTpProps = state =>{
    return{
        posts: state.posts
    }
}

export default connect(
    mapStateTpProps,
    null
)(Home);