import { fromJS } from 'immutable';

import {
  COLLABORATORS_REQUEST,
  COLLABORATORS_ERROR,
  COLLABORATORS_SUCCESS,
} from '../actions/actionTypes';

export const initialState = fromJS({
  loading: false,
  data: [],
  error: null,
  query: {
    page: 1,
    size: 25,
  },
});

const collaboratorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLABORATORS_REQUEST:
      return state.set('loading', true).set('query', fromJS(action.payload));
    case COLLABORATORS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', initialState.get('error'))
        .set('data', fromJS(action.payload.aggregations.author));
    case COLLABORATORS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.payload.error))
        .set('data', initialState.get('data'));
    default:
      return state;
  }
};

export default collaboratorsReducer;
