import * as React from "react";
import * as ReactDOM from "react-dom";

import { Rep } from "./Rep";


export class Page extends React.Component<any, any> {
  constructor() {
    super();
    let reps = ["FOO"];
    // if (localStorage.count) {
    //     reps = [];
    //     for (let i = 0; i < localStorage.count | 0; i++) {
    //       reps.push("A");
    //     }
    // }
    this.state = {
      reps
    }

  }
  onDone() {
    let reps = this.state.reps;
    reps.push("FOO");
    this.setState({reps});
    // localStorage.count = reps.length;
  }
  render() {
    return <div>
      { this.state.reps.map((rep, i) => <Rep onDone={this.onDone.bind(this)} key={i}/>) }
    </div>
  }
}




ReactDOM.render(
  <Page />
  , document.getElementById("app"));