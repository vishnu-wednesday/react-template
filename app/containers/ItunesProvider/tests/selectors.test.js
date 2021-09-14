import {
  selectITunesContainer,
  selectSearchData,
  selectSearchError,
  selectSearchTerm,
  selectTrackDetails
} from '../selectors';

describe('ITunesContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let searchData;
  let searchError;
  let trackDetails;

  beforeEach(() => {
    searchTerm = 'Rihana';
    searchData = { resultCount: 1, results: [{ searchTerm }] };
    searchError = 'There was some error while fetching the repository details';
    trackDetails = { resultCount: 1, results: { songDetails: 'abc' } };

    mockedState = {
      iTunesContainer: {
        searchTerm,
        searchData,
        searchError,
        trackDetails
      }
    };
  });
  it('should select the iTunesContainer state', () => {
    expect(selectITunesContainer(mockedState)).toEqual(mockedState.iTunesContainer);
  });
  it('should select the searchTerm', () => {
    const repoSelector = selectSearchTerm();
    expect(repoSelector(mockedState)).toEqual(searchTerm);
  });

  it('should select searchData', () => {
    const reposDataSelector = selectSearchData();
    expect(reposDataSelector(mockedState)).toEqual(searchData);
  });

  it('should select the reposError', () => {
    const reposErrorSelector = selectSearchError();
    expect(reposErrorSelector(mockedState)).toEqual(searchError);
  });

  it('should select the trackDetails', () => {
    const trackDetailsSelector = selectTrackDetails();
    expect(trackDetailsSelector(mockedState)).toEqual(trackDetails);
  });
});
