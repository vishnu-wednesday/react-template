/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getTracks } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import iTunesSearhSaga, { getItunesResults, getTrackDetails, trackDetailsSaga } from '../saga';
import { iTunesContainerTypes } from '../reducer';
import { selectSearchData } from '../selectors';
// import { selectSearchData, selectTrackDetails } from '../selectors';

describe('HomeContainer saga tests', () => {
  const generator = iTunesSearhSaga();
  const searchTerm = 'rihana';
  let getItunesResGenerator = getItunesResults({ searchTerm });

  it('should start task to watch for REQUEST_GET_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesContainerTypes.REQUEST_GET_TRACKS, getItunesResults));
  });

  it('should ensure that the action FAILURE_GET_TRACKS is dispatched when the api call fails', () => {
    const res = getItunesResGenerator.next().value;
    expect(res).toEqual(call(getTracks, searchTerm));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getItunesResGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.FAILURE_GET_TRACKS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACKS is dispatched when the api call succeeds', () => {
    getItunesResGenerator = getItunesResults({ searchTerm });
    const res = getItunesResGenerator.next().value;
    expect(res).toEqual(call(getTracks, searchTerm));
    const reposResponse = {
      resultCount: 1,
      results: [{ trackInfo: searchTerm }]
    };
    expect(getItunesResGenerator.next(apiResponseGenerator(true, reposResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.SUCCESS_GET_TRACKS,
        data: reposResponse
      })
    );
  });
});

describe('ITunes get track details saga tests', () => {
  let generator;
  let getItunesTrackDetailsGenerator;
  let lookUpId;
  beforeEach(() => {
    generator = trackDetailsSaga();
    lookUpId = '123456';
    getItunesTrackDetailsGenerator = getTrackDetails({ type: 'TEST', lookUpId });
  });

  it('should start up the saga', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesContainerTypes.REQUEST_GET_TRACK_DETAILS, getTrackDetails));
  });

  it('should ensure that SUCCESS_GET_TRACK_DETAILS is dispatched is api succeeds', () => {
    const res = getItunesTrackDetailsGenerator.next().value;
    const val = select(selectSearchData());
    expect(JSON.stringify(res)).toEqual(JSON.stringify(val));

    const trackDetailResponse = {
      resultCount: 1,
      results: [
        {
          songDetails: '123'
        }
      ]
    };
    getItunesTrackDetailsGenerator.next();
    expect(getItunesTrackDetailsGenerator.next(apiResponseGenerator(true, trackDetailResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        // remember we return the first value of the array..
        trackDetails: trackDetailResponse.results[0]
      })
    );
  });

  it('should ensure that FAILURE_GET_TRACK_DETAILS is dispatched on failure', () => {
    getItunesTrackDetailsGenerator.next();
    getItunesTrackDetailsGenerator.next();
    // jump two yields
    const errorResponse = {
      message: 'something_went_wrong'
    };
    expect(getItunesTrackDetailsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.FAILURE_GET_TRACK_DETAILS,
        detailError: errorResponse
      })
    );
  });

  it('should find the track of interest', () => {
    getItunesTrackDetailsGenerator.next();
    expect(
      getItunesTrackDetailsGenerator.next({
        results: [
          {
            trackId: 123456,
            detail: 'test'
          }
        ]
      }).value
    ).toEqual(
      put({
        type: iTunesContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        trackDetails: {
          trackId: 123456,
          detail: 'test'
        }
      })
    );
  });
});
