import React, {Component, Fragment} from 'react';

import { Switch, Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import { Header , Footer } from './components/layouts';
import { Home, Upload, Detail, Login, Signup, ForgotPassword, NotFound, Payment, Search } from './components/pages';

import {loadPosts} from "./Redux/Reducers";

import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.keyPress = this.keyPress.bind(this);


    }

    componentDidMount() {
        this.props.loadPosts();

        document.addEventListener("keydown", this.keyPress, false);
        // document.addEventListener("dblclick", this.keyPress)
        // document.addEventListener("keyup")
        // document.addEventListener("keypress")
        // document.addEventListener("keydown", this.escFunction, false);

    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyPress, false)
    }

    keyPress(e){
        if (e.keyCode === 27 && this.props.location.pathname !== '/'){
            this.props.history.push('/');
        }
    }

    render () {
        return (
            <Fragment>


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
            </Fragment>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return{
        loadPosts: () => dispatch(loadPosts())
    }
}
export default connect(null, mapDispatchToProps)(withRouter(App));
