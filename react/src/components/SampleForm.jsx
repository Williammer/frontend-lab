import React, { Component } from 'react'

class SampleForm extends Component {
  state = {
    logs: [],
    name: "df",
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

  updateInputValue = (evt) => {
    const targetName = evt.target.name;
    let targetValue = evt.target.value;

      if (targetName === "age") {
        targetValue = Number(targetValue) >= 0 ? Number(targetValue) : "";
      }

    this.setState({
      [targetName]: targetValue
    }, () => {
      this.setState((prevState, props) => {
        return {
          isValidToSubmit: this.readyToSubmit(),
          logs: prevState.logs.concat(`this.state.${targetName}: ${this.state[targetName]}; this.state.isValidToSubmit: ${this.state.isValidToSubmit}; `)
        };
      });
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
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            type="text"
            onChange={this.updateInputValue}
            value={name}
            style={{width: "200px"}}
          />
          <br/>

          <label htmlFor="age">Age: </label>
          <input
            name="age"
            type="text"
            onChange={this.updateInputValue}
            value={age}
            style={{width: "200px"}}
          />
          <br/>

          <label htmlFor="moreInfo">MoreInfo: </label>
          <textarea
            name="moreInfo"
            onChange={this.updateInputValue}
            value={moreInfo}>
          </textarea>
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
