import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../store/";
import auth from "../store/auth";

////
let speechRecognition = window.webkitSpeechRecognition;
let recognition = new speechRecognition();
let content = "";
recognition.continous = true;
recognition.onstart = function () {
  // instuctions.text("Voice Recognition is on");
  console.log("Voice Recognition is on");
};
recognition.onspeechend = function () {
  // instuctions.text("No Activity");
  console.log("No Activity");
};

recognition.onerror = function () {
  // instuctions.text("Try Again");
  console.log("Try Again");
};

recognition.onresult = function (event) {
  console.log(event);
  let current = event.resultIndex;
  console.log(current);
  let transcript = event.results[0][0].transcript;
  console.log(transcript);
  // this.setState({notes:transcript})
};

class CreateTaskForm extends Component {
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
      content: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableCreateButton = this.disableCreateButton.bind(this);
    this.voiceToText = this.voiceToText.bind(this);
  }

  voiceToText(str) {
    recognition.start();
    recognition.onresult = (event) => {
      console.log(event);
      let current = event.resultIndex;
      console.log(current);
      let transcript = event.results[0][0].transcript;
      if (str === "notes") {
        this.setState({ notes: transcript });
      } else if (str === "description") {
        this.setState({ description: transcript });
      }
    };
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    if (this.props.auth.role === "Supervisor") {
      this.props.createTask({ ...this.state });
    } else {
      this.props.createTask({ ...this.state, userId: this.props.auth.id });
    }

    this.setState({
      title: "",
      description: "",
      priority: "",
      notes: "",
      expectedDate: "",
      userId: "",
      potential: "",
    });
  }

  disableCreateButton() {
    const {
      title,
      description,
      priority,
      notes,
      expectedDate,
      userId,
      potential,
    } = this.state;
    if (this.props.auth?.role === "Supervisor") {
      return (
        <button
          className="btn btn-primary"
          disabled={
            !title ||
            !description ||
            !priority ||
            !expectedDate ||
            !userId ||
            !potential
          }
        >
          Create
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-primary"
          disabled={
            !title || !description || !priority || !expectedDate || !potential
          }
        >
          Create
        </button>
      );
    }
  }

  render() {
    const {
      title,
      description,
      priority,
      notes,
      expectedDate,
      userId,
      potential,
    } = this.state;
    const { handleSubmit, onChange, disableCreateButton, voiceToText } = this;
    const { assignToList, users } = this.props;
    // const { campuses } = this.props;
    return (
      <form onSubmit={handleSubmit} className="text-center">
        <h2 className="fw-bold">Create Task</h2>
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
        </div>
        <svg
          onClick={() => {
            voiceToText("description");
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-mic-fill"
          viewBox="0 0 16 16"
        >
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
        </svg>
        <div className="mb-2">
          <textarea
            placeholder="Notes"
            name="notes"
            value={notes}
            onChange={onChange}
          />
        </div>
        <svg
          onClick={() => {
            voiceToText("notes");
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-mic-fill"
          viewBox="0 0 16 16"
        >
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
        </svg>
        <div className="mb-2">
          <select name="priority" defaultValue="" onChange={onChange}>
            <option disabled={true} value="">
              -- Priority Level --
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
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
        <br />
        <div className="mb-2">
          <label htmlFor="potential">Potential Earning:</label>
          <input
            type="number"
            min="0"
            name="potential"
            value={potential}
            onChange={onChange}
          />
        </div>

        {auth.role === "Supervisor" && (
          <div className="mb-2">
            <select name="userId" defaultValue="" onChange={onChange}>
              <option disabled={true} value="">
                -- Priority Level --
              </option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        )}
        <br />
        {disableCreateButton()}
      </form>
    );
  }
}
const mapState = (state) => {
  const role = state.auth.role;
  // const assignToList = state.users || [];
  const filteredUsers = state.users?.filter((user) => {
    if (user.role === "Manager") {
      return true;
    } else {
      return false;
    }
  });

  const assignToList = state.users.filter((user) => {
    if (role === "Manager") {
      return user.role === "Technician";
    } else if (role === "Supervisor") {
      return user.role === "Manager";
    }
  });
  // console.log(assignToList);
  return {
    assignToList,
    auth: state.auth,
    users: filteredUsers,
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
