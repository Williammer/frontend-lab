import { withStyles } from '@material-ui/core/styles';

export const styles = theme => ({
  contentInput: {
    minWidth: 400,
  },
  speedInput: {
    maxWidth: 140,
  },
  container: {
    marginTop: 50
  },
  paragraph: {
    maxWidth: 600,
    margin: '10px auto 0',
    fontSize: 14,
  },
  typingFlag: {
    marginTop: 10,
  },
});

export default withStyles(styles);
