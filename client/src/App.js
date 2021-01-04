import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import { Header , Footer } from './components/layouts';
import { Home, Upload, Detail, Login, Signup, ForgotPassword, NotFound, Payment, Search } from './components/pages';

import {loadPosts} from "./Redux/Reducers";

import './App.css';


class App extends React.Component {
    componentDidMount() {
        this.props.loadPosts();
    }

    render () {
        return (
            <Router>
                <Header />
                <br/>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route path="/page/:number" component={ Home } />
                    <Route exact path="/search" component={ Search } />
                    <Route exact path="/commodity/:id" component={ Detail } />
                    <Route path="/payment/:price" component={ Payment } />
                    <Route path="/Upload" component={ Upload } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/signup" component={ Signup } />
                    <Route exact path="/forgotpasssword" component={ ForgotPassword } />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </Router>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return{
        loadPosts: () => dispatch(loadPosts())
    }
}
export default connect(null, mapDispatchToProps)(App);
