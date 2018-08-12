import { ADD_TO_LIST, REMOVE_FROM_LIST, PERFORM_IN_LIST } from './listActions';

export default function listReducer(reducer) {
  return function(state = { items: [] }, action) {
    const { items } = state;
    const { index, action: innerAction } = action;

    switch (action.type) {
      case ADD_TO_LIST:
        return { items: [...items, reducer(undefined, action)] };
      case REMOVE_FROM_LIST:
        return { items: [...items.slice(0, index), ...items.slice(index + 1)] };
      case PERFORM_IN_LIST:
        return {
          items: [
            ...items.slice(0, index),
            reducer(items[index], innerAction),
            ...items.slice(index + 1),
          ],
        };
      default:
        return state;
    }
  };
}
