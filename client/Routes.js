import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Tasks from "./Tasks/Tasks";
import Task from "./Tasks/Task";
import Home from "./components/Home";
import Users from "./Users/Users";
import { me, fetchTasks, fetchUsers } from "./store";
import auth from "./store/auth";
import AssignedTasks from "./Tasks/AssignedTasks";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, auth } = this.props;

    return (
      <>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            {auth.role === "Technician" && (
              <Route path="/tasks" exact component={AssignedTasks} />
            )}
            {auth.role !== "Technician" && (
              <Route path="/tasks" exact component={Tasks} />
            )}
            {auth.role === "Supervisor" && (
              <Route path="/users" exact component={Users} />
            )}

            <Route path="/tasks/:id" exact component={Task} />

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            {/* <Route path="/signup" component={Signup} /> */}
            {/* <Redirect to="/signup" /> */}
          </Switch>
        )}
      </>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  // console.log(state.tasks);
  return {
    // tasks: state.tasks || [],
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => {
      dispatch(me());
      dispatch(fetchTasks());
      dispatch(fetchUsers());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
