import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

const Tasks = ({ task }) => {
  return (
    <div key={task.id}>
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
          {task.assignees?.length
            ? task.assignees.map((assignee) => (
                <li key={assignee.user.id}>{assignee.user.username}</li>
              ))
            : "no assignee"}
        </ul>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state, otherProps) => {
  const task =
    state.tasks.find((task) => task.id === 1 * otherProps.match.params.id) ||
    {};

  return {
    task,
  };
};

export default connect(mapState)(Tasks);
