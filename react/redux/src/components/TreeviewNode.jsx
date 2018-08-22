import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  treeviewWrap: {
    textAlign: 'left',
    marginLeft: '18px',
  },
  indicator: {
    display: 'inline-block',
    marginRight: '10px',
  },
  node: {
    width: 0,
    height: 0,
    borderBottom: 'none',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '10px solid #999',
    cursor: 'pointer',
    '&.collapsed': {
      borderTop: '5px solid transparent',
      borderLeft: '10px solid black',
      borderBottom: '5px solid transparent',
      borderRight: 'none',
    },
  },
  leaf: {
    borderRadius: '50%',
    border: '5px solid #ccc',
    width: 0,
    height: 0,
  },
  treeviewContent: {
    '&.collapsed': {
      height: 0,
      visibility: 'hidden',
    },
  },
});

function NodeIndicator({ classes, ...props }) {
  return <div {...props} className={classes} />;
}

function LeafIndicator({ classes }) {
  return <div className={classes} />;
}

class TreeviewNode extends PureComponent {
  state = {
    collapsed: this.props.defaultCollapsed,
  };

  toggleOpen = () => {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed,
    }));
  };

  render() {
    const { collapsed } = this.state;
    const { content, children, classes } = this.props;
    const { treeviewWrap, indicator, node, leaf, treeviewContent } = classes;

    return (
      <div className={treeviewWrap}>
        {children ? (
          <NodeIndicator
            classes={classNames(indicator, node, collapsed && 'collapsed')}
            onClick={this.toggleOpen}
          />
        ) : (
          <LeafIndicator classes={classNames(indicator, leaf)} />
        )}
        <span>{content}</span>
        <div className={classNames(treeviewContent, collapsed && 'collapsed')}>
          {children}
        </div>
      </div>
    );
  }
}
TreeviewNode.propTypes = {
  defaultCollapsed: PropTypes.bool,
  content: PropTypes.string.isRequired,
};
TreeviewNode.defaultProps = {
  defaultCollapsed: true,
  content: 'treeview node',
};

export default withStyles(styles)(TreeviewNode);
