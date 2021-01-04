// You can use the history methods outside of your components. Try by the following way.
//
//First, create a history object used the history package:
import { createBrowserHistory } from 'history';

export default createBrowserHistory();

/*
Then wrap it in <Router> (please note, you should use import { Router } instead of import { BrowserRouter as Router }):

// src/index.jsx

// ...
import { Router, Route, Link } from 'react-router-dom';
import history from './history';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

Change your current location from any place, for example:

// src/actions/userActionCreators.js

// ...
import history from '../history';

export function login(credentials) {
  return function (dispatch) {
    return loginRemotely(credentials)
      .then((response) => {
        // ...
        history.push('/');
      });
  };
}



*/