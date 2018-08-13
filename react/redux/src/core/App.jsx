import React, { Component } from 'react';
import { NavLink, Route, Switch, BrowserRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

import StopWatch from '../features/stopWatch/StopWatch';
import FormSample from '../features/formSample/FormSample';
import RepoList from '../features/githubUserList/GithubUserList';
import TypeWriter from '../features/typeWriter/TypeWriter';
import TicTacToe from '../features/ticTacToe/TicTacToe';
import Collapsible from '../features/collapsible/Collapsible';
import Draggable from '../features/draggable/Draggable';
import CounterList from '../features/counters/CounterList';
import './App.css';

const TypeWriterDemo = () => {
  const str =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices dolor ac dolor imperdiet ullamcorper. Suspendisse quam libero, luctus auctor mollis sed, malesuada condimentum magna. Quisque in ante tellus, in placerat est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a mi magna, quis mattis dolor. Etiam sit amet ligula quis urna auctor imperdiet nec faucibus ante. Mauri';
  const speed = 20;
  // [Todo] how to handle these config inputs more nicely?
  return TypeWriter(str, speed);
};

const menus = [
  {
    path: '/frontend-lab/repoList',
    title: 'Repo list',
    component: RepoList,
  },
  {
    path: '/frontend-lab/stopWatch',
    title: 'Stop watch',
    component: StopWatch,
  },
  {
    path: '/frontend-lab/form',
    title: 'Form sample',
    component: FormSample,
  },
  {
    path: '/frontend-lab/typeWriter',
    title: 'Type writer',
    component: TypeWriterDemo,
  },
  {
    path: '/frontend-lab/ticTacToe',
    title: 'TicTacToe game',
    component: TicTacToe,
  },
  {
    path: '/frontend-lab/collapsible',
    title: 'Collapsible',
    component: Collapsible,
  },
  {
    path: '/frontend-lab/draggable',
    title: 'Draggable',
    component: Draggable,
  },
  {
    path: '/frontend-lab/counterList',
    title: 'CounterList',
    component: CounterList,
  },
];

const drawerWidth = 150;
const styles = theme => ({
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  linkItem: {
    display: 'block',
    textDecoration: 'none',
    color: '#222',
    padding: '0 14px',
    lineHeight: 30,
    width: '100%',
    fontSize: 15,
    '&.active': {
      fontWeight: 'bold',
      background: '#555',
      color: '#FFF',
    },
  },
  menuItem: {
    padding: 0,
    height: 30,
  },
});

class App extends Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <CssBaseline />
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose,
              ),
            }}
            open={this.state.open}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <MenuList>
              {menus.map(({ path, title }) => (
                <MenuItem key={path} className={classes.menuItem}>
                  <NavLink className={classes.linkItem} to={path}>
                    {title}
                  </NavLink>
                </MenuItem>
              ))}
            </MenuList>
          </Drawer>
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift,
            )}>
            <Toolbar
              disableGutters={!this.state.open}
              className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}>
                <MenuIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}>
                React & Redux Sample Playground
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="App-main">
            <Switch>
              {menus.map(({ path, component }) => (
                <Route key={path} path={path} component={component} />
              ))}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
