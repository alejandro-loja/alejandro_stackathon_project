// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { createTask } from "../store";

// const ListOfTasks = ({ tasks }) => {
//   console.log(this.props);
//   return tasks ? (
//     tasks.map((task) => (
//       <div className="border p-2" key={task.id}>
//         <h1>
//           <Link to={`/tasks/${task.id}`}>{task.title} </Link>
//           <span
//             className={`badge rounded-pill text-bg-${color(task.priority)}`}
//           >
//             Priority: {task.priority}
//           </span>
//         </h1>
//       </div>
//     ))
//   ) : (
//     <div>
//       <h1>No Tasks Yet</h1>
//     </div>
//   );
// };

// export default connect(null)(ListOfTasks);
