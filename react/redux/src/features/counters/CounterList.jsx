import { connect } from 'react-redux';

import Counter from './Counter';
import list from './list';

const CounterList = list(function mapItemStateToProps(itemState) {
  return {
    counter: itemState,
  };
})(Counter);

export default connect(function mapStateToProps(state) {
  return { items: state.counterListReducer.items };
})(CounterList);
