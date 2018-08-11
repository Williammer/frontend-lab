import { combineEpics } from 'redux-observable';
import fetchUserReposEpic from '../../epics/fetchUserRepos';

const rootEpic = combineEpics(fetchUserReposEpic);

export default rootEpic;
