import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getRepos, getTracks, lookUpTrackDetails } from '../repoApi';

describe('RepoApi tests', () => {
  const repositoryName = 'mac';
  it('should make the api call to "/search/repositories?q="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ repositoryName }]
      }
    ];
    mock.onGet(`/search/repositories?q=${repositoryName}`).reply(200, data);
    const res = await getRepos(repositoryName);
    expect(res.data).toEqual(data);
  });
});

describe('Get Tracks Tests', () => {
  const searchTerm = 'rihana';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ songs: searchTerm }]
      }
    ];
    mock.onGet(`/search?term=${searchTerm}`).reply(200, data);
    const res = await getTracks(searchTerm);
    expect(res.data).toEqual(data);
  });
});

describe('Get Track Detail Tests', () => {
  const lookUpId = 123456;
  it('should make the api call to "/lookup?id="', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ songDetails: 'detailed info' }]
      }
    ];
    mock.onGet(`/lookup?id=${lookUpId}`).reply(200, data);
    const res = await lookUpTrackDetails(lookUpId);
    expect(res.data).toEqual(data);
  });
});
