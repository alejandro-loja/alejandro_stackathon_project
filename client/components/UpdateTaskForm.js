import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTask } from "../store/";

class UpdateTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      notes: "",
      priority: "",
      expectedDate: "",
      potential: 0,
      userId: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { task } = this.props;
    this.setState(task);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.task.id);
    console.log(this.props.task.id);
    if (!prevProps.task.id && this.props.task.id) {
      console.log(this.props.task);
      this.setState(this.props.task);
    }
    if (prevProps.task.id && !this.props.task.id) {
      console.log(prevProps);
      this.setState({
        title: "",
        description: "",
        notes: "",
        priority: "",
        expectedDate: "",
        potential: 0,
        userId: "",
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.updateTask({ ...this.state });
    this.setState({
      title: "",
      description: "",
      notes: "",
      priority: "",
      expectedDate: "",
      potential: 0,
      userId: "",
    });
  }

  render() {
    // console.log(this.props.task);
    const {
      title,
      description,
      notes,
      priority,
      expectedDate,
      potential,
      userId,
    } = this.state;
    const { onChange, handleSubmit } = this;
    const { auth, task } = this.props;
    // if (auth.role !== "Technician") {
    return (
      <div className="">
        <h3>Update Task</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />

          <label>Description: </label>
          <textarea
            type="text"
            cols="30"
            rows="7"
            name="description"
            value={description}
            onChange={onChange}
            required
          />

          <label>Potential Earning:</label>
          <input
            type="number"
            name="potential"
            value={potential}
            onChange={onChange}
            required
          />

          {/* <label>
              ML:
              <br />
              <input
                type="number"
                name="ml"
                value={ml}
                onChange={onChange}
                required
              />
            </label>
            <label>
              Limit:
              <br />
              <input
                type="number"
                name="limit"
                value={limit}
                onChange={onChange}
                required
              />
            </label>
            <label>
              ImageUrl:
              <br />
              <input
                type="text"
                name="imgUrl"
                value={imgUrl}
                onChange={onChange}
              />
            </label> */}
          <button type="submit">Update Task</button>
        </form>
      </div>
    );
    // }
  }
}
// const mapState = (state, { task }) => {
//   console.log(task.id);
//   //   const task =
//   //     state.tasks.find((task) => task.id === match.params.id * 1) || {};
//   //   return {
//   //     task,
//   //     auth: state.auth,
//   //   };
//   return {};
// };
const mapDispatch = (dispatch) => {
  return {
    updateTask: (task) => {
      dispatch(updateTask(task));
    },
  };
};
export default connect(null, mapDispatch)(UpdateTaskForm);
