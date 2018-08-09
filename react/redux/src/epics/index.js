import { combineEpics } from 'redux-observable';
import { fetchUserReposEpic } from './fetchUserRepos';

const rootEpic = combineEpics(fetchUserReposEpic);

export default rootEpic;
