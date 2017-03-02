import React, { Component } from 'react'

class SampleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      name: "df",
      age: 1,
      moreInfo: "moreInfo",
    };

    // bind eventHandlers
    this.updateInputValue = this.updateInputValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  isValidName(val) {
    return val && val.length > 3;
  }

  isValidAge(val) {
    return typeof val === 'number' && val >= 0;
  }

  readyToSubmit() {
    const { name, age } = this.state;
    return this.isValidName(name) && this.isValidAge(age);
  }

  updateInputValue(evt) {
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
          logs: prevState.logs.concat(`${targetName}: ${this.state[targetName]}  ||  ready: ${this.readyToSubmit()} `)
        };
      });
    });
  }

  submit(evt) {
    if (!this.readyToSubmit()) {
      evt.preventDefault();
    }

    this.setState((prevState, props) => {
      return {
        logs: prevState.logs.concat(`Submitting: name: ${this.state.name}  ||  ready: ${this.readyToSubmit()} `)
      };
    });
  }

  render() {
    const { name, age, moreInfo, logs } = this.state;
    const readyToSubmit = this.readyToSubmit();

    return (
      <div className="sample-form-container" >
        <ul className="form-logger">
          {logs.map((log, index) => <li key={index}>{log}</li>)}
        </ul>

        <form className="sample-form" onSubmit={this.submit}>
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

          { readyToSubmit ?
            <input
              type="submit"
              value="Submit"
            />
            :
            <span style={{color: 'red'}}>
              Invalid input to submit. Name needs to be at least 4 chars, age needs to be non-negative number.
            </span>
          }
        </form>
      </div>
    )
  }
}

export default SampleForm
