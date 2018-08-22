import React from 'react';
import classNames from 'classnames';
import withStyles from './welcomeStyles';

function Welcome({ classes: { welcome, typewriter } }) {
  return (
    <div className={classNames(welcome, typewriter)}>
      Welcome to React & Redux Demo Playground!
    </div>
  );
}

export default withStyles(Welcome);
