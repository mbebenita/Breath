import * as React from "react";

import { Stopwatch } from "./Stopwatch";
import { Counter } from "./Counter";

export class Rep extends React.Component<any, any> {
  constructor() {
    super();
  }
  onDone() {
    if (this.props.onDone) {
      this.props.onDone();
    }
  }
  render() {
    return <div><Counter/><Stopwatch onDone={this.onDone.bind(this)}/></div>
  }
}
