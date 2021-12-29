/* eslint-disable no-console */
/**
 *
 * Tests for HomeContainer (ITunesGrid)
 *
 */

import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { timeout, renderWithRouterMatch } from '@utils/testUtils';
import { ITunesDetailTest as ITunesDetailContainer } from '../index';
import ITunesDetailContainerLazily from '../Loadable';
import { mockData } from '@app/components/TrackCard/tests/mockTrackResponse';

describe('<ITunesDetails Container Tests', () => {
  let submitSpy;
  let clearSpy;

  const server = setupServer(
    rest.get('/lookup', (req, res, ctx) => {
      const query = req.url.searchParams;
      const id = query.get('id');
      return res(
        ctx.json({
          ok: true,
          results: [
            {
              songDetails: id
            }
          ]
        })
      );
    })
  );

  beforeAll(() => server.listen());

  beforeEach(() => {
    submitSpy = jest.fn();
    clearSpy = jest.fn();
  });

  /* 
   This does test the loadable file. Very weird though.
  */

  it('should render with loadable', async () => {
    const { baseElement } = await renderWithRouterMatch(
      <ITunesDetailContainerLazily
        dispatchGetTrackDetails={submitSpy}
        dispatchClearTrackDetails={clearSpy}
        trackDetails={mockData.results[0]}
      />,

      {
        route: '/track/123',
        path: '/track/:id'
      }
    );
    expect(baseElement).toBeDefined();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithRouterMatch(
      <ITunesDetailContainer dispatchGetTrackDetails={submitSpy} dispatchClearTrackDetails={clearSpy} />,
      {
        route: '/track/123',
        path: '/track/:id'
      }
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatch dispatchGetTrackDetails after rendering', async () => {
    renderWithRouterMatch(
      <ITunesDetailContainer dispatchGetTrackDetails={submitSpy} dispatchClearTrackDetails={clearSpy} />,
      {
        route: '/track/123',
        path: '/track/:id'
      }
    );
    await timeout(200);
    expect(submitSpy).toBeCalled();
  });

  it('should render a album image', () => {
    const { getByTestId } = renderWithRouterMatch(
      <ITunesDetailContainer dispatchGetTrackDetails={submitSpy} dispatchClearTrackDetails={clearSpy} />,
      {
        route: '/track/123',
        path: '/track/:id'
      }
    );
    expect(getByTestId('album-image')).toBeInTheDocument();
  });

  it('should call dispatchClearTracks on unmount', () => {
    const { unmount } = renderWithRouterMatch(
      <ITunesDetailContainer dispatchGetTrackDetails={submitSpy} dispatchClearTrackDetails={clearSpy} />,
      {
        route: '/track/123',
        path: '/track/:id'
      }
    );
    unmount();
    expect(clearSpy).toBeCalled();
  });

  it('should call parse the time correctly', () => {
    const { getByTestId } = renderWithRouterMatch(
      <ITunesDetailContainer
        dispatchGetTrackDetails={submitSpy}
        dispatchClearTrackDetails={clearSpy}
        trackDetails={{ trackTimeMillis: 250000 }}
      />,
      {
        route: '/track/123',
        path: '/track/:id'
      }
    );
    const value = getByTestId('parsed-value');
    expect(value.innerHTML).toEqual('4:10');
  });
});
