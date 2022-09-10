import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat, { masks } from "dateformat";

const TaskReadOnly = ({ task }) => {
  const color = (priority) => {
    if (priority === "High") {
      return "danger";
    } else if (priority === "Medium") {
      return "warning";
    } else {
      return "success";
    }
  };

  return (
    <div className="container" key={task.id}>
      {/* <button>Delete Task</button> */}
      <div className="row">
        <div className="col border-right">
          <h1 className="row border-bottom">{task.title}</h1>
          <h4 className="row">Potential:{` $${task.potential}`}</h4>
          <h4 className="row">
            Priority:
            <span className={`text-${color(task.priority)}`}>
              {task.priority}
            </span>
          </h4>
          <h6 className="row">
            Expected Date:{" "}
            {task.expectedDate
              ? dateFormat(task.expectedDate, "mmmm dS, yyyy")
              : "None"}
          </h6>
          <p className="row border">Description: {task.description}</p>
        </div>
        <div className="col">
          <h6>
            Created By: {task.user?.username ? task.user.username : "None"}{" "}
          </h6>
          <h6>
            Created At:{" "}
            {task.createdAt && dateFormat(task.createdAt, "mmmm dS, yyyy")}
          </h6>
          <h2>Verification Needed By: {task.assigned?.username}</h2>
          {/* {task.assignedId ? <p></p> : <p>No one assigned</p>} */}
          <p className="border">Notes: {task.notes || "None"}</p>
        </div>
      </div>
    </div>
  );
};

const mapState = (state, { match }) => {
  const task =
    state.tasks.find((task) => task.id === 1 * match.params.id) || {};
  // const assignedPerson =
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
