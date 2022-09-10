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
          <h2>Current Tasks</h2>
          {tasks ? (
            tasks.map((task) => (
              <div className="row border p-2" key={task.id}>
                <div className="row">
                  <div className="row text-start">
                    <Link className="col-10" to={`/tasks/${task.id}`}>
                      <h3 className="text-wrap">{task.title} </h3>
                    </Link>
                    <button
                      className="col btn btn-danger btn-sm m-1 p-1"
                      onClick={() => deleteTask(task)}
                    >
                      x
                    </button>
                  </div>
                </div>
                <h6
                  className={`badge rounded-pill text-bg-${color(
                    task.priority
                  )}`}
                >
                  Priority: {task.priority}
                </h6>
                {task.userId ? (
                  <h6 className="text-end">
                    Project Lead: {task.user?.username}
                  </h6>
                ) : (
                  <h6>No Leader Assigned Yet</h6>
                )}
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
const mapState = (state, { match }) => {
  // console.log(match);
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
