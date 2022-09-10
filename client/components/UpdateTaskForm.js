import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTask } from "../store/";
import date from "date-and-time";

//
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
//

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
    this.voiceToText = this.voiceToText.bind(this);
  }

  voiceToText(str) {
    recognition.start();
    recognition.onresult = (event) => {
      let current = event.resultIndex;
      let transcript = event.results[0][0].transcript;
      if (str === "notes") {
        this.setState({ notes: transcript });
      } else if (str === "description") {
        this.setState({ description: transcript });
      }
    };
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
    const { onChange, handleSubmit, voiceToText } = this;
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
