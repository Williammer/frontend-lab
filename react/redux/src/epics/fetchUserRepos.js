import { normalize, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { FETCH_REPOS } from '../constants';
import { updateRepos, fetchReposFailure } from '../actions';

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

async function fetchUserRepos(fetch, username) {
  const endpoint = `https://api.github.com/users/${username}/repos`;
  try {
    const { data } = await fetch(endpoint);
    return data.map(({ name }) => name);
  } catch (e) {
    throw e;
  }
}

export const fetchUserReposEpic = (action$, state$, { fetch }) =>
  action$.pipe(
    ofType(FETCH_REPOS),
    switchMap(({ username }) =>
      from(fetchUserRepos(fetch, username)).pipe(
        map(updateRepos),
        catchError(({ message }) => of(fetchReposFailure(message))),
      ),
    ),
  );
