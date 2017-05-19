import * as React from "react";

export class Stopwatch extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      currentTime: 0,
      startTime: 0,
      timer: 0,
      isDone: false
    };
  }

  componentDidMount() {
    
  }

  onStartOrPause() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: 0
      });
      return;
    }

    var timer = setInterval(() => {
      this.setState({
        currentTime: performance.now()
      });
    }, 33);
    
    this.setState({
      startTime: performance.now() - (this.state.currentTime - this.state.startTime),
      timer
    });
  }

  onStop() {
    clearInterval(this.state.timer);
  }

  onReset() {
    clearInterval(this.state.timer);
    this.setState({
      currentTime: 0,
      startTime: 0,
      timer: 0
    });
  }

  onDone() {
    clearInterval(this.state.timer);
    this.setState({
      isDone: true
    });

    if (this.props.onDone) {
      this.props.onDone();
    }
  }

  render() {
    let elapsedTime = ((this.state.currentTime - this.state.startTime) / 1000).toFixed(2);
    if (this.state.isDone) {
      return <div>Elapsed Time: { elapsedTime }</div>
    }
    return <div>
      Elapsed Time: { elapsedTime }
      <button onClick={this.onStartOrPause.bind(this)}>{this.state.timer ? "Pause" : "Start"}</button>
      <button onClick={this.onReset.bind(this)}>Reset</button>
      <button onClick={this.onDone.bind(this)}>Done</button>
    </div>
  }
}