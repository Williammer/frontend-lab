import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = theme => ({
  itemList: {
    width: 400,
    margin: 'auto',
  },
});
class ItemList extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.list, this.props.list);
  }

  render() {
    const { list, renderHeader, classes, customListClass } = this.props;
    return (
      <div>
        {renderHeader()}
        <List dense className={classNames(classes.itemList, customListClass)}>
          {list.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset>{item}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
ItemList.propTypes = {
  list: PropTypes.array.isRequired,
  renderHeader: PropTypes.func.isRequired,
};
ItemList.defaultProps = {
  list: [],
  renderHeader: () => {},
};

export default withStyles(styles)(ItemList);
