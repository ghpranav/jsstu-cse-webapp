import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import { withRouter } from 'react-router-dom';
import Signup from "./containers/signup/signup";
import Login from "./containers/login/login";
import Landing from "./containers/landing/landing";
import Admin from "./layouts/Admin.js";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  componentDidUpdate() {}

  render() {
    let routes;
    if (this.props.loggedIn) {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Landing loggedIn={this.props.loggedIn} />}
          />
          <Route path="/admin" component={Admin} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Landing loggedIn={this.props.loggedIn} />}
          />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/login" render={() => <Login />} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <header>{routes}</header>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

const mapStateToProps = state => {
  if (state.user === null) {
    console.log("no user is present in session");
  } else {
    return {
      user: state.auth.user,
      loggedIn: state.auth.loggedIn,
      token: state.auth.token
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
