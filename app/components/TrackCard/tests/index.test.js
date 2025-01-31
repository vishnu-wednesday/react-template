/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import TrackCard from '../index';
import { mockData } from './mockTrackResponse';

describe('<TrackCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render one card component', () => {
    const { getByTestId } = renderWithIntl(<TrackCard />);
    expect(getByTestId('track-card')).toBeInTheDocument();
  });

  it('should show trackName for type track ', () => {
    const { queryByText } = renderWithIntl(<TrackCard track={mockData.results[0]} />);
    expect(queryByText(mockData.results[0].trackName)).toBeDefined();
    expect(queryByText(mockData.results[0].collectionName)).toBeNull();
  });

  it('should show collectionName for type collection ', () => {
    const { queryByText } = renderWithIntl(<TrackCard track={mockData.results[1]} />);
    expect(queryByText(mockData.results[1].trackName)).toBeNull();
    expect(queryByText(mockData.results[1].collectionName)).toBeDefined();
  });

  it('should show an audioplayer with src of previewUrl', () => {
    const { getByTestId } = renderWithIntl(<TrackCard track={mockData.results[0]} />);
    expect(getByTestId('audio-player')).toBeInTheDocument();
    expect(getByTestId('audio-player').src).toEqual(mockData.results[0].previewUrl);
  });
});
