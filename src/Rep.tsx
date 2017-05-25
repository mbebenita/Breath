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
      count: 0,
      startTime: 0,
      endTime: 0,
      repState: RepState.NONE
    }
  }
  onCount() {
    this.setState({
      count: this.state.count + 1,
      startTime: performance.now(),
      repState: RepState.IN_PROGRESS
    });
  }
  onStopwatchDone(startTime0, startTime1, endTime1) {
    this.setState({
      endTime: performance.now(),
      repState: RepState.COMPLETED
    });

    if (this.props.onDone) {
      this.props.onDone({
        time: performance.now() - this.state.startTime,
        startTime0,
        startTime1,
        endTime1,
        count: this.state.count
      });
    }
  }
  render() {
    if (this.state.repState == RepState.NONE) {
      return <div style={{backgroundColor: "green", padding: 16}}>
        <Counter count={this.state.count} onCount={this.onCount.bind(this)}/>
      </div>
    } else if (this.state.repState == RepState.IN_PROGRESS) {
      return <div style={{backgroundColor: "green", padding: 16}}>
        <div>{toTime(performance.now() - this.state.startTime)}</div>
        <Counter count={this.state.count} onCount={this.onCount.bind(this)}/><Stopwatch onDone={this.onStopwatchDone.bind(this)}/>
      </div>
    }
    return <div style={{backgroundColor: "green", padding: 16}}>
      <div>{toTime(this.state.endTime - this.state.startTime)}</div>
      <Counter count={this.state.count} onCount={this.onCount.bind(this)}/><Stopwatch onDone={this.onStopwatchDone.bind(this)}/>
    </div>
  }
}
