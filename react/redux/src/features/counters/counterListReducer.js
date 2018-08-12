import counterReducer from './counterReducer';
import listReducer from './listReducer';

const counterListReducer = listReducer(counterReducer);
export default counterListReducer;
