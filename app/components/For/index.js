/**
 *
 * For
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isRow ? `row;` : `column;`)};
`;

export function For({ of, ParentComponent = (props) => <FlexContainer {...props} />, renderItem, noParent, ...props }) {
  const list = () => of.map((item, index) => ({ ...renderItem(item, index), key: index }));
  const children = () => (
    <ParentComponent {...props} data-testid="for">
      {list()}
    </ParentComponent>
  );
  if (noParent) {
    return (of || []).length ? list() : null;
  }
  return (of || []).length ? children() : null;
}

For.propTypes = {
  of: PropTypes.array,
  type: PropTypes.node,
  parent: PropTypes.object,
  iteratee: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  noParent: PropTypes.bool,
  isRow: PropTypes.bool
};
For.defaultProps = {
  isRow: true
};
export default For;
