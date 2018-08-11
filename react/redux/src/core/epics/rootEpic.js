import { combineEpics } from 'redux-observable';
import fetchUserReposEpic from '../../containers/githubUserList/fetchUserReposEpic';

const rootEpic = combineEpics(fetchUserReposEpic);

export default rootEpic;
