import Fade from '@material-ui/core/Fade';
import JankDetectClock from './JankDetectClock';
import withToolTip from '../../components/withToolTip';

const toolTipProps = {
  TransitionComponent: Fade,
  TransitionProps: { timeout: 600 },
  title: 'Jank Detect Clock',
  placement: 'bottom',
};

export default withToolTip(JankDetectClock, toolTipProps);
