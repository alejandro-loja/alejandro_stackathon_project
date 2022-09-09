import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat, { masks } from "dateformat";

const TaskReadOnly = ({ task }) => {
  return (
    <div key={task.id}>
      {/* <button>Delete Task</button> */}
      <div>
        <h1>Title: {task.title}</h1>
        <p>Description: {task.description}</p>
      </div>
      <div>
        <p>Notes: {task.notes}</p>
      </div>
      <div>
        <h2>Responsibilty</h2>
        <h3>{task.user?.username}</h3>
      </div>
      <div>
        <h2>Assigned To:</h2>
        <ul>
          {task.assignees?.length ? (
            task.assignees.map((assignee) => (
              <li key={assignee.user.id}>{assignee.user.username}</li>
            ))
          ) : (
            <li>No one assigned</li>
          )}
        </ul>
        <h4>Created By: {task.user?.username} </h4>
        <h4>
          Created At:{" "}
          {task.createdAt && dateFormat(task.createdAt, "mmmm dS, yyyy")}
        </h4>
      </div>
    </div>
  );
};

const mapState = (state, { match }) => {
  const task =
    state.tasks.find((task) => task.id === 1 * match.params.id) || {};

  return {
    task,
    match,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateTask: (task) => {
      dispatch(updateTask(task));
    },
  };
};

export default connect(mapState, mapDispatch)(TaskReadOnly);
