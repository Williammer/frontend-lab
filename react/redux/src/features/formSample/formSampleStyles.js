import { withStyles } from '@material-ui/core/styles';

export const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: 330,
    margin: 'auto',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 140,
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  errorMessage: {
    textAlign: 'left',
    width: 300,
  },
});

export default withStyles(styles);
