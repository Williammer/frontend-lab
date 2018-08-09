import { normalize, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { FETCH_REPOS, FETCH_REPOS_SUCCESS } from '../constants';
import { fetchReposSuccess } from '../actions';

const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute: user => user.login.toLowerCase(),
  },
);
const repoSchema = new schema.Entity(
  'repos',
  {
    owner: userSchema,
  },
  {
    idAttribute: repo => repo.name.toLowerCase(),
  },
);

async function fetchUserRepos(username) {
  const endpoint = `https://api.github.com/users/${username}/repos`;
  const response = await fetch(endpoint);
  const json = await response.json();
  if (!response.ok) {
    throw json;
  }
  const camelizedJson = camelizeKeys(json);

  return normalize(camelizedJson, [repoSchema]);
}

export const fetchUserReposEpic = (action$, state$, dep) =>
  action$.pipe(
    ofType(FETCH_REPOS),
    mergeMap(({ username }) =>
      fromPromise(fetchUserRepos(username)).pipe(map(fetchReposSuccess)),
    ),
  );
