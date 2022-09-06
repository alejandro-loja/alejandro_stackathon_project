import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateTaskForm from "../components/CreateTaskForm";
import auth from "../store/auth";

/**
 * COMPONENT
 */
const Tasks = ({ tasks, auth }) => {
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
                <h4 className="text-end">
                  Created By{" "}
                  {task.userId === auth.id ? "You" : task.user?.username}
                </h4>
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
    auth: state.auth,
  };
};

export default connect(mapState)(Tasks);
