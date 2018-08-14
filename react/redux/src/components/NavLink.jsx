import React from 'react';
import classNames from 'classnames';
import { Link } from '@reach/router';

export default function NavLink(props) {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        const newClassName = isCurrent
          ? classNames(props.className, 'active')
          : props.className;
        return { className: newClassName };
      }}>
      {props.children}
    </Link>
  );
}
