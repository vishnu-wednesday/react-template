/*
 *
 * ITunesContainer reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const { Types: iTunesContainerTypes, Creators: iTunesCreators } = createActions({
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

const iTunesContainerReducer = (state = iTunesServiceInitialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case iTunesContainerTypes.REQUEST_GET_TRACKS:
        draft.searchTerm = action.searchTerm;
        break;

      case iTunesContainerTypes.SUCCESS_GET_TRACKS:
        draft.searchData = action.data;
        break;

      case iTunesContainerTypes.FAILURE_GET_TRACKS:
        draft.searchData = {};
        draft.searchError = get(action.error, 'message', 'something_went_wrong');
        break;

      case iTunesContainerTypes.REQUEST_GET_TRACK_DETAILS:
        draft.lookUpId = action.lookUpId;
        break;

      case iTunesContainerTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.trackDetails = action.trackDetails;
        break;

      case iTunesContainerTypes.FAILURE_GET_TRACK_DETAILS:
        draft.trackDetails = {};
        draft.trackDetailsError = get(action.detailError, 'message', 'something_went_wrong');
        break;

      case iTunesContainerTypes.CLEAR_TRACK_DETAILS:
        draft.trackDetails = {};
        draft.lookUpId = null;
        break;

      case iTunesContainerTypes.CLEAR_TRACKS:
        return iTunesServiceInitialState;
    }
  });

export default iTunesContainerReducer;
