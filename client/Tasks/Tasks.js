import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Tasks = ({ tasks }) => {
  return (
    <ul>
      {tasks &&
        tasks.map((task) => (
          <li key={task.id}>
            <h1>
              <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            </h1>
            <h2>Priority: {task.priority}</h2>
            <p>{task.description}</p>
          </li>
        ))}
    </ul>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log("hello");
  console.log(state.tasks);
  return {
    tasks: state.tasks,
  };
};

export default connect(mapState)(Tasks);
