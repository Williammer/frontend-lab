import { combineEpics } from 'redux-observable';
import fetchUserReposEpic from '../features/githubUserList/fetchUserReposEpic';

const rootEpic = combineEpics(fetchUserReposEpic);

export default rootEpic;
