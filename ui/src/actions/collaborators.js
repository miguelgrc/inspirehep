import { stringify } from 'qs';
import {
  COLLABORATORS_ERROR,
  COLLABORATORS_SUCCESS,
  COLLABORATORS_REQUEST,
} from './actionTypes';
import { httpErrorToActionPayload } from '../common/utils';

function fetchingCollaborators(query) {
  return {
    type: COLLABORATORS_REQUEST,
    payload: query,
  };
}

function fetchCollaboratorsSuccess(result) {
  return {
    type: COLLABORATORS_SUCCESS,
    payload: result,
  };
}

function fetchCollaboratorsError(error) {
  return {
    type: COLLABORATORS_ERROR,
    payload: error,
  };
}

export function fetchCollaborators(literatureSearchQuery) {
  return async (dispatch, getState, http) => {
    dispatch(fetchingCollaborators(literatureSearchQuery));
    try {
      const query = {
        ...literatureSearchQuery,
        facet_name: 'collaborators',
      };
      const queryString = stringify(query, { indices: false });
      const url = `/literature/facets?${queryString}`;
      const response = await http.get(url);
      dispatch(fetchCollaboratorsSuccess(response.data));
    } catch (error) {
      const payload = httpErrorToActionPayload(error);
      dispatch(fetchCollaboratorsError(payload));
    }
  };
}
