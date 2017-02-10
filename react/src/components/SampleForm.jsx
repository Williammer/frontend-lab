import React, { Component } from 'react'

class SampleForm extends Component {
  state = {
    logs: [],
    name: "default",
    age: 1,
    moreInfo: "moreInfo",
    isValidToSubmit: false
  }

  _isValidName = (val) => {
    return val && val.length > 3;
  }

  _isValidAge = (val) => {
    return typeof val === 'number' && val >= 0;
  }

  readyToSubmit = () => {
    const { name, age } = this.state;
    return this._isValidName(name) && this._isValidAge(age);
  }

  updateNameValue = (evt) => {
    this.setState({
      name: evt.target.value
    }, () => {
      this.setState((prevState, props) => {
        return {
          isValidToSubmit: this.readyToSubmit(),
          logs: prevState.logs.concat(`this.state.name: ${this.state.name}; this.state.isValidToSubmit: ${this.state.isValidToSubmit}; `)
        };
      });
    });
  }

  updateAgeValue = (evt) => {
    const targetValue = Number(evt.target.value);
    if (!(targetValue >= 0)) {
      return;
    }
    this.setState({
      age: targetValue
    }, () => {
      this.setState((prevState, props) => {
        return {
          isValidToSubmit: this.readyToSubmit(),
          logs: prevState.logs.concat(`this.state.age: ${this.state.age}; this.state.isValidToSubmit: ${this.state.isValidToSubmit}; `)
        };
      });
    });
  }

  updateTextAreaValue = (evt) => {
    this.setState({
      moreInfo: evt.target.value
    });
  }

  submit = (evt) => {
    this.setState((prevState, props) => {
      return {
        logs: prevState.logs.concat(`Submitting: this.state.name: ${this.state.name}; this.state.isValidToSubmit: ${this.state.isValidToSubmit}; `)
      };
    });

    if (!this.state.isValidToSubmit) {
      evt.preventDefault();
    }
  }

  componentDidMount() {
    this.setState({
      isValidToSubmit: this.readyToSubmit()
    });
  }

  render() {
    const { name, age, moreInfo, isValidToSubmit, logs } = this.state;

    return (
      <div>
        <form onSubmit={this.submit}>
          <label for="name">Name: </label>
          <input
            name="name"
            type="text"
            onChange={this.updateNameValue}
            value={name}
            style={{width: "200px"}}
          />
          <br/>

          <label for="age">Age: </label>
          <input
            name="age"
            type="text"
            onChange={this.updateAgeValue}
            value={age}
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
              Invalid input to submit. Name needs to be over 3 chars, age needs to be non-negative number.
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
