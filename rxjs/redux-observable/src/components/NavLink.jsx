import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NavLink extends Component {
  render() {
    return <Link {...this.props} activeClassName="active">{this.props.children}</Link>
  }
}

export default NavLink;
