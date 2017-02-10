import React, { Component } from 'react'

class SampleForm extends Component {
  state = {
    logs: [],
    input: "default",
    moreInfo: "moreInfo",
    isValidToSubmit: false
  }

  _isValidInput = (val) => {
    return val && val.length > 3;
  }

  updateInputValue = (evt) => {
    // this.setState(this.input.value); // uncontrolled form
    let isValidToSubmit = false;
    if (this._isValidInput(evt.target.value)) {
      isValidToSubmit = true;
    }
    this.setState({
      input: evt.target.value,
      isValidToSubmit: isValidToSubmit
    }, () => this.setState((prevState, props) => {
      return {
        logs: prevState.logs.concat(`this.state.input: ${this.state.input}; this.state.isValidToSubmit: ${this.state.isValidToSubmit}; `)
      };
    }));
  }

  updateTextAreaValue = (evt) => {
    this.setState({
      moreInfo: evt.target.value
    });
  }

  submit = (evt) => {
    this.setState((prevState, props) => {
      return {
        logs: prevState.logs.concat(`Submitting: this.state.input: ${this.state.input}; this.state.isValidToSubmit: ${this.state.isValidToSubmit}; `)
      };
    });

    if (!this.state.isValidToSubmit) {
      evt.preventDefault();
    }
  }

  componentDidMount() {
    this.setState({
      isValidToSubmit: this._isValidInput(this.state.input)
    });
  }

  render() {
    const { input, moreInfo, isValidToSubmit, logs } = this.state;

    return (
      <div>
        <form onSubmit={this.submit}>
          <input
            type="text"
            // ref={el => this.input = el}
            onChange={this.updateInputValue}
            value={input}
            style={{width: "200px"}}
          />
          <br/>

          <textarea onChange={this.updateTextAreaValue} value={moreInfo}></textarea>
          <br/>

          {isValidToSubmit ?
            <input
              type="submit"
              value="Submit"
            />
            :
            <span style={{color: 'red'}}>
              Invalid input to submit, need to be over 3 chars.
            </span>
          }
        </form>

        <ul className="form-logger">
          {logs.map((log, index) => <li key={index}>{log}</li>)}
        </ul>
      </div>
    )
  }
}

export default SampleForm
