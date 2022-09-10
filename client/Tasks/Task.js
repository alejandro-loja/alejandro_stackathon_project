import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat, { masks } from "dateformat";
import UpdateTaskForm from "../components/updateTaskForm";
import TaskReadOnly from "../components/taskReadOnly";
// import { Link } from "react-router-dom";

const Task = ({ auth, task, match }) => {
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

export default connect(mapState, null)(Task);
