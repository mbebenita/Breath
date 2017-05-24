import * as React from "react";
import * as ReactDOM from "react-dom";

import { Session } from "./Session";


export class Page extends React.Component<any, any> {
  constructor() {
    super();
  }

  render() {
    return <div>
      <Session/>
    </div>
  }
}




ReactDOM.render(
  <Page />
  , document.getElementById("app"));