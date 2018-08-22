import React from 'react';
import classNames from 'classnames';
import withStyles from './welcomeStyles';

function Welcome({ classes: { welcome, typewriter } }) {
  return (
    <div className={classNames(welcome, typewriter)}>
      Welcome to React & Redux Demo Playground, choose the demo from sidebar to
      play!
    </div>
  );
}

export default withStyles(Welcome);
