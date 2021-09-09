/**
 *
 * Tests for Clickable
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
import Clickable from '../index';

describe('<Clickable /> component tests', () => {
  it('should render and match the snapshot', () => {
    // renderWithIntl is a render using react-testing library. It was passed the locale and translation messages.
    const { baseElement } = renderWithIntl(<Clickable onClick={jest.fn()} textId="wednesday_solutions" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Clickable component', () => {
    const { getAllByTestId } = renderWithIntl(<Clickable onClick={jest.fn()} textId="wednesday_solutions" />);
    expect(getAllByTestId('clickable').length).toBe(1);
  });

  it('should render the text according to the textId', () => {
    const { getAllByText } = renderWithIntl(<Clickable onClick={jest.fn()} textId="wednesday_solutions" />);
    expect(getAllByText(/Wednesday Solutions/).length).toBe(1);
  });

  it('should call the prop onClick when the clickable component is clicked', () => {
    const clickSpy = jest.fn();
    const { getAllByText, queryByText } = renderWithIntl(<Clickable onClick={clickSpy} textId="wednesday_solutions" />);
    expect(getAllByText(/Wednesday Solutions/).length).toBe(1);
    fireEvent.click(queryByText(/Wednesday Solutions/));
    expect(clickSpy).toBeCalled();
  });
});
