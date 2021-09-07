import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');
const iTunesApi = generateApiClient('itunes');

export const getRepos = (repoName) => repoApi.get(`/search/repositories?q=${repoName}`);

export const getTracks = (trackName) => iTunesApi.get(`/search?term=${trackName}`);

export const lookUpTrackDetails = (lookUpId) => iTunesApi.get(`/lookup?id=${lookUpId}`);

//Maybe change this file name for all purposes considered? apiStore.js or something?
