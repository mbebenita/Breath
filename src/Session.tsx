import * as React from "react";
import { Rep } from "./Rep";
import { toTime } from "./util";

enum SessionState {
  NONE,
  IN_PROGRESS,
  COMPLETE
}

export class Session extends React.Component<{
  onDone: (json: any) => void
}, any> {
  constructor() {
    super();
    let reps = [{}];
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
  onRepDone(rep) {
    if (this.state.sessionState == SessionState.COMPLETE) {
      return;
    }
    let reps = this.state.reps;
    reps[reps.length - 1] = rep;
    reps.push({});
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
      if (this.props.onDone) {
        this.props.onDone([
          {
            date: new Date(),
            time: performance.now() - this.state.startTime,
            reps: this.state.reps
          }
        ]);
      }
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
          { this.state.reps.map((rep, i) => <Rep onDone={this.onRepDone.bind(this)} key={i}/>) }
        </div>
      </div>
    }
    return <div>
      Session {toTime(performance.now() - this.state.startTime)}
      <div style={{backgroundColor: "red", padding: 16}}>
        { this.state.reps.map((rep, i) => <Rep onDone={this.onRepDone.bind(this)} key={i}/>) }
      </div>
      <button onClick={this.onClick.bind(this)}>{"End Session"}</button>
    </div>
  }
}
