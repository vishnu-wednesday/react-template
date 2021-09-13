import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getTracks, lookUpTrackDetails } from '@services/repoApi';
import { iTunesContainerTypes, iTunesCreators } from './reducer';
import { selectSearchData } from './selectors';

const { REQUEST_GET_TRACKS, REQUEST_GET_TRACK_DETAILS } = iTunesContainerTypes;
const { successGetTracks, failureGetTracks, successGetTrackDetails, failureGetTrackDetails } = iTunesCreators;

export function* getItunesResults(action) {
  const response = yield call(getTracks, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTracks(data));
  } else {
    yield put(failureGetTracks(data));
  }
}

export function* getTrackDetails(action) {
  const trackDetails = yield select(selectSearchData());
  const trackOfInterest = trackDetails?.results?.find((track) => track.trackId === parseInt(action.lookUpId, 10));
  if (trackOfInterest) {
    yield put(successGetTrackDetails(trackOfInterest));
  } else {
    const response = yield call(lookUpTrackDetails, action.lookUpId);
    const { data, ok } = response;
    if (ok) {
      yield put(successGetTrackDetails(data.results[0]));
    } else {
      yield put(failureGetTrackDetails(data));
    }
  }
}

// Individual exports for testing
export default function* iTunesSearchSaga() {
  yield takeLatest(REQUEST_GET_TRACKS, getItunesResults);
}

export function* trackDetailsSaga() {
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, getTrackDetails);
}
