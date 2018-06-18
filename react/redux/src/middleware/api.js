import { normalize, schema } from 'normalizr';
import { camelizeKeys } from 'humps';


// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('API_Call');

const callApi = (endpoint, schema) => {
  return fetch(endpoint).then(response => response.json().then(json => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    const camelizedJson = camelizeKeys(json);

    return Object.assign({}, normalize(camelizedJson, schema));
  }));
};

const userSchema = new schema.Entity(
  'users', {}, {
    idAttribute: user => user.login.toLowerCase()
  }
);

const repoSchema = new schema.Entity(
  'repos', {
    owner: userSchema
  }, {
    idAttribute: repo => repo.name.toLowerCase()
  }
);

// Schemas for Github API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema]
};

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store =>
  next =>
  action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
      return next(action);
    }

    let { endpoint } = callAPI;
    const { schema, types } = callAPI;

    if (typeof endpoint === 'function') {
      endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.');
    }

    if (!schema) {
      throw new Error('Specify one of the exported Schemas.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.');
    }

    // Standardized action with the meta data it carries.
    const actionWith = data => {
      const finalAction = Object.assign({}, action, data);
      delete finalAction[CALL_API];
      return finalAction;
    };

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    return callApi(endpoint, schema).then(
      response =>
      next(
        actionWith({
          response,
          type: successType
        })
      ),
      error =>
      next(
        actionWith({
          type: failureType,
          error: error.message || 'Something bad happened'
        })
      )
    );
  };
