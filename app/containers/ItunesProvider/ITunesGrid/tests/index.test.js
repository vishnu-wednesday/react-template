/**
 *
 * Tests for (ITunesGrid)
 *
 */

import React from 'react';
import { timeout, renderProvider, createIntlUtil } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesGridTest as ITunesGridContainer } from '../index';
import { setIntl, translate } from '@app/components/IntlGlobalProvider/index';

describe('<ITunesGridContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunesGridContainer dispatchItunesSearch={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItunesSearch on empty change', async () => {
    const getItunesSearchSpy = jest.fn();
    const clearItunesSearchSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ITunesGridContainer dispatchClearItunesSearch={clearItunesSearchSpy} dispatchItunesSearch={getItunesSearchSpy} />
    );
    // renderProvider renders the tree. It wires up everything and renders the children you pass it in.
    // note that it uses the react testing library render function.
    // getByTestId is a shortcut to container.querySelector(`[data-testid="${yourId}"]`)
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItunesSearchSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesSearchSpy).toBeCalled();
  });

  it('should call dispatchItunesSearch on change', async () => {
    const { getByTestId } = renderProvider(<ITunesGridContainer dispatchItunesSearch={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'rihana' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should call dispatchItunesSearch when a search term is present and data is empty', async () => {
    const { getByTestId } = renderProvider(
      <ITunesGridContainer
        dispatchItunesSearch={submitSpy}
        itunesSearchTerm="rihana"
        itunesSearchData={{
          items: []
        }}
      />
    );
    getByTestId('search-bar').value = 'rihana';
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should render the error container when itunessearcherror is present', () => {
    const { queryByText } = renderProvider(
      <ITunesGridContainer
        dispatchItunesSearch={submitSpy}
        itunesSearchTerm="rihana"
        itunesSearchError="something_went_wrong"
      />
    );
    let mockIntl = createIntlUtil();
    setIntl(mockIntl);
    expect(queryByText(translate('something_went_wrong'))).toBeInTheDocument();
  });

  it('should render the error container when itunessearcherror is present with no results text', () => {
    const { queryByText } = renderProvider(
      <ITunesGridContainer
        dispatchItunesSearch={submitSpy}
        itunesSearchTerm="rihana"
        itunesSearchData={{
          resultCount: 0
        }}
      />
    );
    let mockIntl = createIntlUtil();
    setIntl(mockIntl);
    expect(queryByText(translate('itunes_search_default'))).toBeInTheDocument();
  });
});
