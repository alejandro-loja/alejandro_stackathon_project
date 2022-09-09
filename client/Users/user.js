import React, { Component } from "react";
import { connect } from "react-redux";

import UpdateTaskForm from "../components/UpdateTaskForm";
import TaskReadOnly from "../components/taskReadOnly";
// import { Link } from "react-router-dom";

const User = ({ auth, task, match }) => {
  if (auth.role === "Technician") {
    return <TaskReadOnly match={match} />;
  }
  return <UpdateTaskForm match={match} />;
};

const mapState = (state, { match }) => {
  const task =
    state.tasks.find((task) => task.id === 1 * match.params.id) || {};

  return {
    task,
    match,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateUser: (task) => {
      dispatch(updateUser(task));
    },
  };
};

export default connect(mapState, mapDispatch)(User);
