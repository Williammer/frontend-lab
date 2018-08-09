import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';

import fetchUserReposEpic from '../fetchUserRepos';
import { toArray } from 'rxjs/internal/operators/toArray';

it('should fetch and return the update repos action', done => {
  const mockResponse = {
    data: [
      {
        name: 'react',
        license: 'MIT',
      },
      {
        name: 'redux',
        license: 'MIT',
      },
      {
        name: 'redux-observable',
        license: 'MIT',
      },
    ],
  };
  const action$ = of({ type: 'FETCH_REPOS', username: 'william' });
  const state$ = null; // not needed for this epic
  const dependencies = {
    fetch: url => Promise.resolve(mockResponse),
  };
  const result$ = fetchUserReposEpic(action$, state$, dependencies);

  result$.subscribe(
    actions => {
      expect(actions).toEqual({
        type: 'UPDATE_REPOS',
        repos: ['react', 'redux', 'redux-observable'],
      });
    },
    done,
    done,
  );
});

it('should return the fetch repos failure action if has exception', done => {
  const mockErrorObject = { message: 'Not Found!' };
  const action$ = of({ type: 'FETCH_REPOS', username: 'william' });
  const state$ = null; // not needed for this epic
  const dependencies = {
    fetch: url => Promise.reject(mockErrorObject),
  };
  const result$ = fetchUserReposEpic(action$, state$, dependencies);

  result$.subscribe(
    action => {
      expect(action).toEqual({
        type: 'FETCH_REPOS_FAILURE',
        error: mockErrorObject.message,
      });
    },
    done,
    done,
  );
});
