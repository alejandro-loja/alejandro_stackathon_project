import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateTaskForm from "../components/CreateTaskForm";

/**
 * COMPONENT
 */
const Tasks = ({ tasks }) => {
  const color = (priority) => {
    if (priority === "high") {
      return "danger";
    } else if (priority === "medium") {
      return "warning";
    } else {
      return "success";
    }
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          {tasks ? (
            tasks.map((task) => (
              <div className="border p-2" key={task.id}>
                <h1>
                  <Link to={`/tasks/${task.id}`}>{task.title} </Link>
                  <span
                    className={`badge rounded-pill text-bg-${color(
                      task.priority
                    )}`}
                  >
                    Priority: {task.priority}
                  </span>
                </h1>
              </div>
            ))
          ) : (
            <div>
              <h1>No Tasks Yet</h1>
            </div>
          )}
        </div>
        <div className="col">
          <CreateTaskForm />
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    tasks: state.tasks || [],
  };
};

export default connect(mapState)(Tasks);
