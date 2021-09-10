/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetTracks: ['searchTerm'],
  successGetTracks: ['data'],
  failureGetTracks: ['error'],
  requestGetTrackDetails: ['lookUpId'],
  successGetTrackDetails: ['trackDetails'],
  failureGetTrackDetails: ['detailError'],
  clearTrackDetails: [],
  clearTracks: []
});

export const iTunesServiceInitialState = {
  searchTerm: null,
  searchData: {},
  searchError: null,
  lookUpId: null,
  trackDetails: {},
  trackDetailsError: null
};

const homeContainerReducer = (state = iTunesServiceInitialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_TRACKS:
        draft.searchTerm = action.searchTerm;
        break;

      case homeContainerTypes.SUCCESS_GET_TRACKS:
        draft.searchData = action.data;
        break;

      case homeContainerTypes.FAILURE_GET_TRACKS:
        draft.searchData = {};
        draft.searchError = get(action.error, 'message', 'something_went_wrong');
        break;

      case homeContainerTypes.REQUEST_GET_TRACK_DETAILS:
        draft.lookUpId = action.lookUpId;
        break;

      case homeContainerTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.trackDetails = action.trackDetails;
        break;

      case homeContainerTypes.FAILURE_GET_TRACK_DETAILS:
        draft.trackDetails = {};
        draft.trackDetailsError = get(action.detailError, 'message', 'something_went_wrong');
        break;

      case homeContainerTypes.CLEAR_TRACK_DETAILS:
        draft.trackDetails = {};
        draft.lookUpId = null;
        break;

      case homeContainerTypes.CLEAR_TRACKS:
        return iTunesServiceInitialState;
    }
  });

export default homeContainerReducer;
