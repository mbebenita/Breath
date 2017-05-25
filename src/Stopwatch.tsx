import * as React from "react";
import { toTime } from "./util";

enum StopwatchState {
  /**
   * No timing has started.
   */
  NONE,
  /**
   * First timer.
   */
  TIME0,
  /**
   * Second timer.
   */
  TIME1,
  DONE
}

export class Stopwatch extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      stopwatchState: StopwatchState.NONE,
      startTime0: 0,
      startTime1: 0,
      endTime1: 0
    };

    setInterval(() => {
      this.forceUpdate();
    });
  }
  onClick() {
    if (this.state.stopwatchState == StopwatchState.NONE) {
      this.setState({
        stopwatchState: StopwatchState.TIME0,
        startTime0: performance.now()
      });
    } else if (this.state.stopwatchState == StopwatchState.TIME0) {
      this.setState({
        stopwatchState: StopwatchState.TIME1,
        startTime1: performance.now()
      });
    } else if (this.state.stopwatchState == StopwatchState.TIME1) {
      this.setState({
        stopwatchState: StopwatchState.DONE,
        endTime1: performance.now()
      });

      if (this.props.onDone) {
        this.props.onDone();
      }
    }
  }

  render() {
    if (this.state.stopwatchState == StopwatchState.NONE) {
      return <div>
        <button onClick={this.onClick.bind(this)}>{"Start"}</button>
      </div>
    } else if (this.state.stopwatchState == StopwatchState.TIME0) {
      return <div>
        <span>First Time: {toTime(performance.now() - this.state.startTime0)}</span>
        <button onClick={this.onClick.bind(this)}>{"Done"}</button>
      </div>
    } else if (this.state.stopwatchState == StopwatchState.TIME1) {
      return <div>
        <span>
          First Time: {toTime(this.state.startTime1 - this.state.startTime0)},
          Second Time: {toTime(performance.now() - this.state.startTime1)}
        </span>
        <button onClick={this.onClick.bind(this)}>{"Done"}</button>
      </div>
    } else if (this.state.stopwatchState == StopwatchState.DONE) {
      return <div>
        <span>
          First Time: {toTime(this.state.startTime1 - this.state.startTime0)},
          Second Time: {toTime(this.state.endTime1 - this.state.startTime1)}</span>
      </div>
    }
  }
}