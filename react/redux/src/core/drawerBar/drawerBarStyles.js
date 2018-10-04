import {
  withStyles
} from '@material-ui/core/styles';

const defaultStyle = {
  drawerWidth: 170,
  height: 30,
  linkFontSize: 14,
  linkPadding: '0 14px',
};

const mobileStyle = {
  drawerWidth: 100,
  height: 24,
  linkFontSize: 12,
  titleFontSize: 16,
  linkPadding: '0 8px',
  textEllipsis: {
    overflow: 'inherit',
    textOverflow: 'ellipsis'
  }
};

export const styles = theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    height: '100vh',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      width: mobileStyle.drawerWidth,
    },
    [theme.breakpoints.up('sm')]: {
      width: defaultStyle.drawerWidth,
    },
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: 0,
    },
  },
  appBar: {
    background: '#2196f3',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: mobileStyle.drawerWidth,
      width: `calc(100% - ${mobileStyle.drawerWidth}px)`,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: defaultStyle.drawerWidth,
      width: `calc(100% - ${defaultStyle.drawerWidth}px)`,
    },
  },
  linkItem: {
    display: 'block',
    textDecoration: 'none',
    color: '#222',
    width: '100%',
    '&.active': {
      fontWeight: 'bold',
      background: '#5A5A5A',
      color: '#FFF',
    },
    [theme.breakpoints.down('sm')]: {
      lineHeight: mobileStyle.height,
      fontSize: mobileStyle.linkFontSize,
      padding: mobileStyle.linkPadding,
      ...mobileStyle.textEllipsis,
    },
    [theme.breakpoints.up('sm')]: {
      lineHeight: defaultStyle.height,
      fontSize: defaultStyle.linkFontSize,
      padding: defaultStyle.linkPadding,
    },
  },
  menuItem: {
    padding: '4px 0',
    [theme.breakpoints.down('sm')]: {
      height: mobileStyle.height,
    },
    [theme.breakpoints.up('sm')]: {
      height: defaultStyle.height,
    },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    '& > a': {
      textDecoration: 'none',
      color: '#FFF',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: mobileStyle.titleFontSize,
    },
  },


});

export default withStyles(styles);