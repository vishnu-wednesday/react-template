import { createSelector } from 'reselect';
import get from 'lodash/get';
import { iTunesServiceInitialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */
/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */
// is this wrong? https://redux.js.org/usage/deriving-data-selectors#createselector-overview. Read the Warning
// we have DRY breakage here...
//export const selectITunesContainer = () => createSelector(selectITunesContainerDomain, (substate) => substate);
export const selectITunesContainer = (state) => state.iTunesContainer || iTunesServiceInitialState;

export const selectSearchData = () => createSelector(selectITunesContainer, (substate) => get(substate, 'searchData'));

export const selectSearchError = () =>
  createSelector(selectITunesContainer, (substate) => get(substate, 'searchError'));

export const selectSearchTerm = () => createSelector(selectITunesContainer, (substate) => get(substate, 'searchTerm'));

export const selectTrackDetails = () =>
  createSelector(selectITunesContainer, (substate) => get(substate, 'trackDetails'));

export default selectITunesContainer;
