import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

class Test extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { name: "From React" };
  }
  render() {
    return <div>{this.state.name}</div>;
  }
}

export default Test;

ReactDOM.render(<Test />, document.getElementById("app"));
