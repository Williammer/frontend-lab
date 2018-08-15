import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class TypeWriter extends PureComponent {
  state = {
    position: 0,
    isTyping: false,
    started: false,
  };

  _typingInterval = null;

  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
  }

  start() {
    const { content, speed } = this.props;
    this.clearTimer();
    this._typingInterval = window.setInterval(() => {
      if (this.state.position >= content.length) {
        this.reset();
        return;
      }

      this.setState((prevState, props) => {
        return {
          started: true,
          isTyping: true,
          position: prevState.position + 1,
        };
      });
    }, 1000 / speed);
  }

  pause() {
    this.clearTimer();
    this.setState({
      isTyping: false,
    });
  }

  reset() {
    this.clearTimer();
    this.setState({
      position: 0,
      isTyping: false,
      started: false,
    });
  }

  restart() {
    this.setState(
      {
        position: 0,
      },
      this.start,
    );
  }

  clearTimer() {
    if (this._typingInterval) {
      window.clearInterval(this._typingInterval);
      this._typingInterval = null;
    }
  }

  componentDidUpdate({content: prevContent, speed: prevSpeed}) {
    const { content, speed} = this.props;
    if(prevContent !== content || prevSpeed !== speed) {
      this.reset();
    }
  }

  componentWillUnmount() {
    this.reset();
  }

  render() {
    const { classes, content } = this.props;
    const { position, isTyping, started } = this.state;
    return (
      <div className={classes.container}>
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={
              isTyping
                ? this.pause
                : this.start
          }>
          {!started 
            ? 'Start'
            : isTyping
              ? 'Pause'
              : 'Resume'}
        </Button>{' '}
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={this.reset}>
          Reset
        </Button>
        <Typography color="textSecondary" className={classes.typingFlag}>
          { `isTyping: ${isTyping}` }
        </Typography>
        <Typography color="textPrimary" className={classes.paragraph} paragraph>
          {started ? content.slice(0, position) : content}
        </Typography>
      </div>
    );
  }
}

TypeWriter.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};
