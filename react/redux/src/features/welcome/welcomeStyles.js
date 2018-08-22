import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@keyframes blink': {
    from: {
      borderRightColor: '#555',
    },
    to: {
      borderRightColor: 'transparent',
    },
  },
  '@keyframes typewriter': {
    from: {
      width: 0,
    },
    to: {
      width: '21em',
    },
  },
  welcome: {
    color: '#555',
    width: '21em',
    overflow: 'hidden',
    height: '20px',
    margin: '0 auto',
    borderRight: '2px solid #555',
  },
  typewriter: {
    animation: `blink 800ms steps(40) infinite normal,
    typewriter 3s steps(40) 1s 1 normal both`,
  },
});

export default withStyles(styles);
