import * as React from "react";
import { Rep } from "./Rep";
import { toTime } from "./util";

enum SessionState {
  NONE,
  IN_PROGRESS,
  COMPLETE
}

export class Session extends React.Component<any, any> {
  constructor() {
    super();
    let reps = ["FOO"];
    this.state = {
      reps,
      startTime: 0,
      endTime: 0,
      sessionState: SessionState.NONE
    }

    setInterval(() => {
      this.forceUpdate();
    });
  }
  onDone() {
    if (this.state.sessionState == SessionState.COMPLETE) {
      return;
    }
    let reps = this.state.reps;
    reps.push("FOO");
    this.setState({reps});
  }
  onClick() {
    if (this.state.sessionState == SessionState.NONE) {
      this.setState({
        sessionState: SessionState.IN_PROGRESS,
        startTime: performance.now()
      });
    } else if (this.state.sessionState == SessionState.IN_PROGRESS) {
      this.setState({
        sessionState: SessionState.COMPLETE,
        endTime: performance.now()
      });
    }
  }
  render() {
    if (this.state.sessionState == SessionState.NONE) {
      return <div>
        <button onClick={this.onClick.bind(this)}>{"Start Session"}</button>
      </div>
    } else if (this.state.sessionState == SessionState.COMPLETE) {
      return <div>
        Session is Over {toTime(this.state.endTime - this.state.startTime)}
        <div style={{backgroundColor: "red", padding: 16}}>
          { this.state.reps.map((rep, i) => <Rep onDone={this.onDone.bind(this)} key={i}/>) }
        </div>
      </div>
    }
    return <div>
      Session {toTime(performance.now() - this.state.startTime)}
      <div style={{backgroundColor: "red", padding: 16}}>
        { this.state.reps.map((rep, i) => <Rep onDone={this.onDone.bind(this)} key={i}/>) }
      </div>
      <button onClick={this.onClick.bind(this)}>{"End Session"}</button>
    </div>
  }
}
