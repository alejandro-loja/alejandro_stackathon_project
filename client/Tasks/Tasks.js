import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateTaskForm from "../components/CreateTaskForm";
import { deleteTask } from "../store";
import auth from "../store/auth";

/**
 * COMPONENT
 */
const Tasks = ({ tasks, auth, deleteTask }) => {
  if (tasks) {
    console.log("task is true");
  } else {
    console.log("task is false");
  }
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
    <div className="container">
      <div className="row">
        <div className="col list-of-things border-bottom">
          {tasks ? (
            tasks.map((task) => (
              <div className="row border p-2" key={task.id}>
                <div className="text-end">
                  <button
                    className="fs-6 btn btn-danger"
                    onClick={() => deleteTask(task)}
                  >
                    X
                  </button>
                </div>
                <Link to={`/tasks/${task.id}`}>
                  <h3 className="text-wrap">{task.title} </h3>
                </Link>
                <h6
                  className={`badge rounded-pill text-bg-${color(
                    task.priority
                  )}`}
                >
                  Priority: {task.priority}
                </h6>

                <h6 className="text-end">
                  Created By{" "}
                  {task.userId === auth.id ? "You" : task.user?.username}
                </h6>
              </div>
            ))
          ) : (
            <div>
              <h1>No Tasks Yet</h1>
            </div>
          )}
        </div>
        <div className="col text-center">
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

const mapDispatch = (dispatch) => {
  return {
    deleteTask: (task) => {
      dispatch(deleteTask(task));
    },
  };
};

export default connect(mapState, mapDispatch)(Tasks);
