import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import CreateTaskForm from "../components/CreateTaskForm";

/**
 * COMPONENT
 */
const AssignedTasks = ({ myTasks, allTasks }) => {
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
        <div className="col">
          <h1 className="text-center">Your Assignments</h1>
          {myTasks ? (
            myTasks.map((task) => (
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
                  {task.user
                    ? `Leader: ${task.user.username}`
                    : "No Leader Assigned"}
                </h4>
              </div>
            ))
          ) : (
            <div>
              <h1>You Have not Current Tasks</h1>
            </div>
          )}
        </div>
        {/* <div className="col">
          <CreateTaskForm />
        </div> */}
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log(state.auth);
  return {
    allTasks: state.tasks || [],
    myTasks: state.tasks || [],
  };
};

export default connect(mapState)(AssignedTasks);
