import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { connect } from 'react-redux';

import { homeContainerCreators } from '../reducer';
import { selectTrackDetails } from '../selectors';
import { trackDetailsSaga } from '../saga';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;

export function ITunesDetailContainer({ maxwidth, padding, dispatchGetTrackDetails }) {
  const { id: lookUpId } = useParams();

  useEffect(() => {
    dispatchGetTrackDetails(lookUpId);
  }, [lookUpId]);

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <Row gutter={16}>
        <Col xs={20} md={14}>
          {lookUpId}
        </Col>
        <Col xs={20} md={10}>
          {lookUpId}
        </Col>
      </Row>
    </Container>
  );
}

ITunesDetailContainer.propTypes = {
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  intl: PropTypes.object,
  trackDetails: PropTypes.object,
  dispatchGetTrackDetails: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails } = homeContainerCreators;
  return {
    dispatchGetTrackDetails: (lookUpId) => dispatch(requestGetTrackDetails(lookUpId))
  };
}

const mapStateToProps = createStructuredSelector({
  trackDetails: selectTrackDetails()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: trackDetailsSaga })
)(ITunesDetailContainer);
