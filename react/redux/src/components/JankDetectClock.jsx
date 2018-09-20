import React, { createRef, PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import withToolTip from './withToolTip';

const SPEED = 0.003 / Math.PI;
const FRAMES = 10;
const radius = 25;
const centerX = 30;
const centerY = 30;

const styles = theme => ({
  clockContainer: {
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1201,
    height: '64px',
    width: '64px',
  },
});

class JankDetectClock extends PureComponent {
  arcGroupRef = createRef();
  frame = null;
  rotation = 0;
  t0 = Date.now();
  arcs = [];

  animate = () => {
    const now = Date.now();
    const td = now - this.t0;
    this.rotation = (this.rotation + SPEED * td) % (2 * Math.PI); // angle degree compared to last frame
    this.t0 = now;

    this.arcs.push({ rotation: this.rotation, td });

    let lx, ly, tx, ty;
    // ensure at least FRAMES num of arcs to show on clock
    if (this.arcs.length > FRAMES) {
      this.arcs.forEach(({ rotation, td }, i) => {
        lx = tx;
        ly = ty;
        tx = centerX + radius * Math.cos(rotation);
        ty = centerY + radius * Math.sin(rotation);
        const bigArc = SPEED * td < Math.PI ? '0' : '1';
        const path = `M${tx} ${ty}A${radius} ${radius} 0 ${bigArc} 0 ${lx} ${ly}L${centerX} ${centerY}`;
        const hue = 120 - Math.min(120, td / 4);
        // show color hue based on time-gap from last frame, which display the detected jank frame more vividly
        const color = `hsl(${hue}, 100%, ${60 - i * (30 / FRAMES)}%)`;
        if (i !== 0) {
          const arcEl = this.arcGroupRef.current.children[i - 1];
          arcEl.setAttribute('d', path);
          arcEl.setAttribute('fill', color);
        }
      });
      this.arcs.shift();
    }
    this.frame = requestAnimationFrame(this.animate);
  };

  componentDidMount() {
    this.frame = requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }

  render() {
    const paths = new Array(FRAMES);
    for (let i = 0; i < FRAMES; i++) {
      paths.push(<path className="arcHand" key={i} />);
    }

    const { classes, ...restProps } = this.props;
    return (
      <div {...restProps} className={classes.clockContainer}>
        <svg
          height={(radius + 10) * 2}
          width={(radius + 10) * 2}
          x={centerX - radius}
          y={centerY - radius}>
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 2}
            fill="black"
            style={{ opacity: 0.7 }}
            strokeWidth="2"
            stroke="yellow"
          />
          <g ref={this.arcGroupRef}>{paths}</g>
        </svg>
      </div>
    );
  }
}

const toolTipProps = {
  TransitionComponent: Fade,
  TransitionProps: { timeout: 600 },
  title: 'Jank Detect Clock',
  placement: 'bottom',
};

const styledClock = withStyles(styles)(JankDetectClock);
export default withToolTip(styledClock, toolTipProps);
