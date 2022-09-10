import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTask } from "../store/";
import date from "date-and-time";

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
    console.log(this.props.task);
    this.setState(this.props.task);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.task.id && this.props.task.id) {
      this.setState(this.props.task);
    }
    if (prevProps.task.id && !this.props.task.id) {
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
  }

  render() {
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
    const { auth } = this.props;
    return (
      <div className="container">
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
            value={description || ""}
            onChange={onChange}
            required
          />

          <label>Potential Earning:</label>
          <input
            type="number"
            name="potential"
            value={potential || ""}
            onChange={onChange}
            required
          />
          <label>Notes: </label>
          <textarea
            type="text"
            cols="30"
            rows="7"
            name="notes"
            value={notes || ""}
            onChange={onChange}
            required
          />
          <br />
          {/* <label htmlFor="expected date">Expected Date:</label>
          <input
            type="date"
            id="expectedDate"
            name="expectedDate"
            value={expectedDate}
            onChange={onChange}
          ></input> */}
          <select name="priority" defaultValue={priority} onChange={onChange}>
            <option disabled={true} value="">
              -- Priority Level --
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <br />
          <button className="btn btn-primary" type="submit">
            Update Task
          </button>
        </form>
      </div>
    );
  }
}
const mapState = (state, { match }) => {
  let task = state.tasks.find((task) => task.id === match.params.id * 1) || {};
  //   console.log(task.expectedDate);
  //   console.log(task.expectedDate && date(task.expectedDate, "yyyy-MM-dd"));
  //   task = { ...task, expectedDate: date(task.expectedDate, "yyyy-MM-dd") };
  return {
    task,
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    updateTask: (task) => {
      dispatch(updateTask(task));
    },
  };
};
export default connect(mapState, mapDispatch)(UpdateTaskForm);
