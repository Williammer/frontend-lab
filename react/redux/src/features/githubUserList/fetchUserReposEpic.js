import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { FETCH_REPOS } from './githubUserListConstants';
import { updateRepos, fetchReposFailure } from './githubUserListActions';

async function fetchUserRepos(fetch, username) {
  const endpoint = `https://api.github.com/users/${username}/repos`;
  try {
    const { data } = await fetch(endpoint);
    return data.map(({ name }) => name);
  } catch (e) {
    throw e;
  }
}

const fetchUserReposEpic = (action$, state$, { fetch }) =>
  action$.pipe(
    ofType(FETCH_REPOS),
    switchMap(({ username }) =>
      from(fetchUserRepos(fetch, username)).pipe(
        map(updateRepos),
        catchError(({ message }) => of(fetchReposFailure(message))),
      ),
    ),
  );

export default fetchUserReposEpic;
