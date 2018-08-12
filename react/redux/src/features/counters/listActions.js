export const ADD_TO_LIST = 'ADD_TO_LIST';
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';
export const PERFORM_IN_LIST = 'PERFORM_IN_LIST';

export function addToList() {
  return {
    type: ADD_TO_LIST,
  };
}

export function removeFromList(index) {
  return {
    type: REMOVE_FROM_LIST,
    index,
  };
}

export function performInList(index, action) {
  return {
    type: PERFORM_IN_LIST,
    index,
    action,
  };
}
