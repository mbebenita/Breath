import * as React from "react";
import { toTime } from "./util";
import { Stopwatch } from "./Stopwatch";
import { Counter } from "./Counter";

enum RepState {
  NONE,
  IN_PROGRESS,
  COMPLETED
}
export class Rep extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      startTime: 0,
      endTime: 0,
      repState: RepState.NONE
    }
  }
  onStart() {
    this.setState({
      startTime: performance.now(),
      repState: RepState.IN_PROGRESS
    });
  }
  onDone() {
    if (this.props.onDone) {
      this.props.onDone();
    }
    this.setState({
      endTime: performance.now(),
      repState: RepState.COMPLETED
    });
  }
  render() {
    if (this.state.repState == RepState.NONE) {
      return <div style={{backgroundColor: "green", padding: 16}}>
        <Counter onStart={this.onStart.bind(this)}/>
      </div>
    } else if (this.state.repState == RepState.IN_PROGRESS) {
      return <div style={{backgroundColor: "green", padding: 16}}>
        <div>{toTime(performance.now() - this.state.startTime)}</div>
        <Counter onStart={this.onStart.bind(this)}/><Stopwatch onDone={this.onDone.bind(this)}/>
      </div>
    }
    return <div style={{backgroundColor: "green", padding: 16}}>
      <div>{toTime(this.state.endTime - this.state.startTime)}</div>
      <Counter onStart={this.onStart.bind(this)}/><Stopwatch onDone={this.onDone.bind(this)}/>
    </div>
  }
}
