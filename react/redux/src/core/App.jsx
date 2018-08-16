import React, { Component } from 'react';
import { Router } from '@reach/router';
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

import NavLink from '../components/NavLink';
import withStyles from './rootStyles';
import routes from './routes';
import './App.css';

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
            {routes.map(({ path, title }) => (
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
          <Router>
            {routes.map(({ path, component: Comp }) => (
              <Comp key={path} path={path} />
            ))}
          </Router>
        </div>
      </div>
    );
  }
}

export default withStyles(App);
