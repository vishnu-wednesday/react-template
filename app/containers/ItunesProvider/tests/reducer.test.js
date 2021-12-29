import { createIntlUtil } from '@app/utils/testUtils';
import { setIntl } from '@components/IntlGlobalProvider';
import iTunesContainerReducer, { iTunesServiceInitialState, iTunesContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = iTunesServiceInitialState;
  });

  it('should return the initial state', () => {
    expect(iTunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_TRACKS is dispatched', () => {
    const searchTerm = 'rihana';
    const expectedResult = { ...state, searchTerm };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.REQUEST_GET_TRACKS,
        searchTerm
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the search data is present and loading = false when SUCCESS_GET_TRACKS is dispatched', () => {
    const data = { name: 'rihana' };
    const expectedResult = { ...state, searchData: data };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SUCCESS_GET_TRACKS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the an error message is shown and loading = false when FAILURE_GET_TRACKS is dispatched', () => {
    setIntl(createIntlUtil());
    const error = {
      message: 'something_went_wrong'
    };
    const expectedResult = {
      ...state,
      searchError: 'something_went_wrong'
    };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.FAILURE_GET_TRACKS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return initialState when CLEAR_TRACKS is dispactched', () => {
    state = {
      ...state,
      searchData: { result: 'rihana' }
    };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.CLEAR_TRACKS
      })
    ).toEqual(iTunesServiceInitialState);
  });
});

describe('ITunesDetails Specific Reducer Tests', () => {
  let state;
  beforeEach(() => {
    state = iTunesServiceInitialState;
  });

  it('should return the initial state when an action of type REQUEST_GET_TRACK_DETAILS is dispatched', () => {
    const lookUpId = '123456';
    const expectedResult = { ...state, lookUpId };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.REQUEST_GET_TRACK_DETAILS,
        lookUpId
      })
    ).toEqual(expectedResult);
  });

  it('should return the track detail data after SUCCESS_GET_TRACK_DETAILS is dispatched', () => {
    const data = {
      songData: 123
    };
    const expectedResult = { ...state, trackDetails: data };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        trackDetails: data
      })
    ).toEqual(expectedResult);
  });

  it('should return an error after FAILURE_GET_TRACK_DETAILS is dispatched', () => {
    setIntl(createIntlUtil());
    const error = {
      message: 'something_went_wrong'
    };
    const expectedResult = { ...state, trackDetailsError: error.message };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.FAILURE_GET_TRACK_DETAILS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should clear the trackDetails on CLEAR_TRACK_DETAILS', () => {
    state = {
      trackDetails: {
        songDetails: '123'
      },
      ...state
    };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.CLEAR_TRACK_DETAILS
      })
    ).toEqual(iTunesServiceInitialState);
  });
});
