import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from './formSampleStyles';

class FormSample extends Component {
  constructor() {
    super();
    this.state = {
      logs: [],
      name: '',
      age: '',
      moreInfo: '',
    };

    this.onInputChanged = this.onInputChanged.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.updateInputDebounced = debounce(
      this.updateInputValue.bind(this),
      1000,
    );
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

  onInputChanged({ target: { name, value } }) {
    this.updateInputDebounced(name, value);
  }

  updateInputValue(name, value) {
    if (name === 'age') {
      value = Number(value) || 0;
    }
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.setState(({ logs }) => ({
          logs: [
            `${name}: ${this.state[name]}  ||  ready: ${this.readyToSubmit()} `,
            ...logs,
          ],
        }));
      },
    );
  }

  submit(evt) {
    evt.preventDefault();

    this.setState(({ logs }) => {
      return {
        logs: [
          `Submitting: name: ${this.state.name}  ||  age: ${
            this.state.age
          }  ||  moreInfo: ${this.state.moreInfo} `,
          ...logs,
        ],
      };
    });
  }

  componentWillUnmount() {
    this.updateInputDebounced.cancel();
  }
  render() {
    const { classes } = this.props;
    const { logs } = this.state;
    const readyToSubmit = this.readyToSubmit();

    return (
      <div className="sample-form-container">
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={this.submit}>
          <TextField
            name="name"
            label="Name: "
            margin="normal"
            className={classes.textField}
            helperText="Please input your name"
            onChange={this.onInputChanged}
          />
          <TextField
            name="age"
            type="number"
            label="Age: "
            margin="normal"
            className={classes.textField}
            helperText="Please input your age"
            onChange={this.onInputChanged}
          />
          <TextField
            name="moreInfo"
            label="More Information: "
            margin="normal"
            className={classes.textArea}
            helperText="More information about yourself"
            onChange={this.onInputChanged}
          />
          <br />
          {readyToSubmit ? (
            <Button
              color="secondary"
              size="small"
              variant="outlined"
              type="submit">
              Submit
            </Button>
          ) : (
            <Typography color="error" className={classes.errorMessage}>
              Invalid input value. Name needs to be at least 4 chars, age needs
              to be non-negative number.
            </Typography>
          )}
        </form>
        <ul className="form-logger">
          Logs:
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    );
  }
}
FormSample.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(FormSample);
