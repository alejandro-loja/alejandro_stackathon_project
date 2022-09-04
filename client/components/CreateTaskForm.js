import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../store/";

class CreateTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      notes: "",
      priority: "",
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
    this.props.createTask({ ...this.state });
    this.setState({
      title: "",
      description: "",
      priority: "",
    });
  }

  render() {
    const { title, description, priority, notes } = this.state;
    const { handleSubmit, onChange } = this;
    // const { campuses } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <h2>Create Task</h2>
        <input
          placeholder="Title (Required)"
          value={title}
          name="title"
          onChange={onChange}
        />
        <input
          placeholder="Description (Required)"
          name="description"
          value={description}
          onChange={onChange}
        />
        <input
          placeholder="Notes"
          name="notes"
          value={notes}
          onChange={onChange}
        />
        <select name="priority" defaultValue="" onChange={onChange}>
          <option disabled={true} value="">
            -- Priority Level --
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button disabled={!title || !description || !priority}>Create</button>
      </form>
    );
  }
}
const mapState = (state) => {};
const mapDispatch = (dispatch) => {
  return {
    createTask: (task) => {
      dispatch(createTask(task));
    },
  };
};
export default connect(null, mapDispatch)(CreateTaskForm);
