import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../store/";
import auth from "../store/auth";

class CreateTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      notes: "",
      priority: "",
      expectedDate: "",
      // department: "",
      //   userId: null,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.createTask({ ...this.state, userId: this.props.auth.id });
    this.setState({
      title: "",
      description: "",
      priority: "",
      notes: "",
    });
  }

  render() {
    const { title, description, priority, notes, expectedDate } = this.state;
    const { handleSubmit, onChange } = this;
    const { assignToList } = this.props;
    // const { campuses } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <h2>Create Task</h2>
        <div className="mb-2">
          <input
            placeholder="Title (Required)"
            value={title}
            name="title"
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Description (Required)"
            name="description"
            value={description}
            onChange={onChange}
          />

          <textarea
            placeholder="Notes"
            name="notes"
            value={notes}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <select name="priority" defaultValue="" onChange={onChange}>
            <option disabled={true} value="">
              -- Priority Level --
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <br />
        <label htmlFor="expected date">Expected Date:</label>
        <input
          type="date"
          id="expectedDate"
          value={expectedDate}
          name="expectedDate"
          onChange={onChange}
        ></input>
        <button disabled={!title || !description || !priority}>Create</button>
      </form>
    );
  }
}
const mapState = (state) => {
  const role = state.auth.role;
  // const assignToList = state.users || [];

  const assignToList = state.users.filter((user) => {
    if (role === "manager") {
      return user.role === "technician";
    } else if (role === "supervisor") {
      return user.role === "manager";
    }
  });
  console.log(assignToList);
  return {
    assignToList,
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    createTask: (task) => {
      dispatch(createTask(task));
    },
  };
};
export default connect(mapState, mapDispatch)(CreateTaskForm);
