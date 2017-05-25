import * as React from "react";
import * as ReactDOM from "react-dom";
import { Session } from "./Session";
import { saveState, loadState, updateState } from "./util";

let uri: string = window.location.search.substring(1);

export class Page extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      json: [],
      showAll:  false
    };
    if (uri) {
      loadState(uri, (json) => {
        this.setState({
          json: json
        })
      });
    }
  }

  onDone(json: any) {
    if (uri) {
      json = this.state.json.concat(json);
      updateState(uri, json, (uri) => {
        console.log("Updated");
      });
    } else {
      saveState(json, (uri) => {
        history.replaceState({}, uri, '?' + uri);
      });
    }
  }

  onShowHide() {
    this.setState({
      showAll: !this.state.showAll
    });
  }

  render() {
    return <div>
      <Session onDone={this.onDone.bind(this)}/>
      <button onClick={this.onShowHide.bind(this)}>Show / Hide Data</button>
      { this.state.showAll && this.state.json.map((rep) => {
          return <pre>
            {JSON.stringify(rep, null, 1)}
          </pre>
        })
      }
    </div>
  }
}

ReactDOM.render(
  <Page />
  , document.getElementById("app"));