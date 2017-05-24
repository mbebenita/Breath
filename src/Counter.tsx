import * as React from "react";

export class Counter extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }
  onCount(e) {
    if (e.button == 2) {
      this.setState({
        count: 0
      });
      e.preventDefault();
    } else {
      if (this.state.count == 0) {
        if (this.props.onStart) {
          this.props.onStart();
        }
      }
      this.setState({
        count: this.state.count + 1
      });
    }
  }
  onContextMenu() {
    return false;
  }
  render() {
    let buttonStyle = {
      width: 100,
      height: 100,
      fontSize: 50
    };
    return <div style={{backgroundColor: "blue", padding: 16}}>
      <button style={buttonStyle}
      onMouseDown={this.onCount.bind(this)}
      onContextMenu={this.onContextMenu.bind(this)}
      >{this.state.count}</button>
    </div>
  }
}
