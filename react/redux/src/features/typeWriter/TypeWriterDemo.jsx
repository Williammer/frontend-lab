import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import withStyles from './typeWriterStyles';
import TypeWriter from './TypeWriter';

const defaultTypeWritingContent = 'This is a default string for typeWriter.';
const defaultSpeed = 50;

class TypeWriterDemo extends PureComponent {
  state = {
    content: '',
    speed: 0,
  };

  constructor() {
    super();
    this.contentInput = React.createRef();
    this.speedInput = React.createRef();
    this.setup = this.setup.bind(this);
  }

  setup() {
    this.setState(() => ({
      content: this.contentInput.current.value,
      speed: Math.round(this.speedInput.current.value),
    }));
  }

  render() {
    const { content, speed } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <TextField
          className={classes.contentInput}
          name="content"
          label="Typewriter content: "
          margin="normal"
          defaultValue={defaultTypeWritingContent}
          multiline
          inputRef={this.contentInput}
        />{' '}
        <TextField
          className={classes.speedInput}
          type="number"
          name="speed"
          label="Speed(chars/sec): "
          margin="normal"
          defaultValue={defaultSpeed}
          inputRef={this.speedInput}
        />
        <br />
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={this.setup}>
          Setup
        </Button>
        <br />
        <br />
        <Divider />
        {content &&
          speed && (
            <TypeWriter classes={classes} content={content} speed={speed} />
          )}
      </div>
    );
  }
}

export default withStyles(TypeWriterDemo);
