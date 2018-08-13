import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addToList, removeFromList, performInList } from './listActions';
import Button from '@material-ui/core/Button';

export default function list(mapItemStateToProps) {
  return function(Item) {
    return class List extends Component {
      static propTypes = {
        dispatch: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
      };

      render() {
        const { dispatch, items } = this.props;
        return (
          <div>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => dispatch(addToList())}>
              Add counter
            </Button>{' '}
            {items &&
              items.length > 0 && (
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={() => dispatch(removeFromList(items.length - 1))}>
                  Remove counter
                </Button>
              )}
            <br />
            {items &&
              items.map((item, index) => (
                <Item
                  {...mapItemStateToProps(item)}
                  key={index}
                  dispatch={action => dispatch(performInList(index, action))}
                />
              ))}
          </div>
        );
      }
    };
  };
}
