import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addToList, removeFromList, performInList } from './listActions';

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
            <button onClick={() => dispatch(addToList())}>Add counter</button>
            <br />
            {items &&
              items.length > 0 && (
                <button
                  onClick={() => dispatch(removeFromList(items.length - 1))}>
                  Remove counter
                </button>
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
